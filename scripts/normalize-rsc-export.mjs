import { constants } from 'node:fs';
import { copyFile, readdir, readFile, rmdir, unlink } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const treeFile = '__next._tree.txt';
const segmentComponent = /^[a-zA-Z0-9_$@()%+.,~=-]+$/;

// Next.js #85374 / #92339: on Windows the exporter can retain backslashes
// in segment filenames. Flatten only the segment suffix, never the route path.
export async function normalizeRscExport(root) {
  const plan = [];
  const segmentDirectories = [];
  let routes = 0;
  const unexpected = (path) => new Error(`Unexpected Next.js static RSC export structure: ${path}`);

  async function segments(directory, parts, add) {
    segmentDirectories.push(directory);
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const source = join(directory, entry.name);
      if (!segmentComponent.test(entry.name)) throw unexpected(source);
      if (entry.isDirectory()) await segments(source, [...parts, entry.name], add);
      else if (entry.isFile() && entry.name.endsWith('.txt')) {
        add([...parts, entry.name].join('.'), source);
      } else throw unexpected(source);
    }
  }

  async function visit(directory) {
    const entries = await readdir(directory, { withFileTypes: true });
    const assets = new Map(entries.map((entry) => [entry.name.toLowerCase(), entry]));
    const tree = entries.some((entry) => entry.isFile() && entry.name === treeFile);
    const mapped = new Set();
    let page = entries.some((entry) => entry.isFile() && /^__next(?:\..+)?\.__PAGE__\.txt$/.test(entry.name));
    for (const entry of entries) {
      if (!entry.name.startsWith('__next.') && !entry.isDirectory()) continue;
      const path = join(directory, entry.name);
      if (entry.name.startsWith('__next.') && !entry.isFile()) {
        if (!tree || !entry.isDirectory() || !segmentComponent.test(entry.name)) throw unexpected(path);
        await segments(path, [entry.name], (name, source) => {
          const key = name.toLowerCase();
          if (mapped.has(key)) throw new Error(`Multiple RSC payloads map to ${join(directory, name)}`);
          mapped.add(key);
          const existing = assets.get(key);
          if (existing && (!existing.isFile() || existing.name !== name)) {
            throw new Error(`Conflicting RSC export destination: ${join(directory, name)}`);
          }
          plan.push({ source, target: join(directory, name), exists: Boolean(existing) });
          page ||= name.endsWith('.__PAGE__.txt');
        });
      } else if (entry.isDirectory() && entry.name !== '_next') await visit(path);
    }
    if (tree) {
      if (!page) throw unexpected(directory);
      routes++;
    }
  }

  await visit(root);
  // Guard against changed/missing exports; an already-flat build is valid.
  if (!routes || !(await readdir(root)).includes(treeFile)) throw unexpected(root);

  // Check every collision before touching any file. Identical targets allow
  // a safe rerun if a previous execution stopped between copy and unlink.
  for (const { source, target, exists } of plan) {
    if (exists && !(await readFile(source)).equals(await readFile(target))) {
      throw new Error(`Conflicting RSC export destination: ${target}`);
    }
  }
  for (const { source, target, exists } of plan) {
    if (!exists) await copyFile(source, target, constants.COPYFILE_EXCL);
    await unlink(source);
  }
  for (const directory of segmentDirectories.reverse()) await rmdir(directory);
  return plan.length;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  console.log(`Normalized ${await normalizeRscExport(resolve('out'))} RSC segment files`);
}