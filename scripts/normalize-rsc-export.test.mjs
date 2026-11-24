import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { normalizeRscExport } from './normalize-rsc-export.mjs';

async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), 'benkai-rsc-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const write = async (name, bytes = name) => {
    const file = join(root, name);
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, bytes);
  };
  await write('__next._tree.txt');
  await write('__next.__PAGE__.txt');
  return { root, write, read: (name) => readFile(join(root, name)) };
}

test('flattens only segments, without changing bytes; accepts a second run', async (t) => {
  const f = await fixture(t);
  const bytes = Buffer.from([0, 255, 13, 10]);
  const pairs = [
    ['services/__next.services/__PAGE__.txt', 'services/__next.services.__PAGE__.txt'],
    ['projects/example/__next.projects/$d$slug/__PAGE__.txt', 'projects/example/__next.projects.$d$slug.__PAGE__.txt'],
  ];
  for (const [source] of pairs) await f.write(source, bytes);
  for (const route of ['services', 'projects/example', 'contact']) await f.write(`${route}/__next._tree.txt`);
  await f.write('contact/__next.contact.__PAGE__.txt', bytes);
  await f.write('projects/example.html', bytes);
  await f.write(pairs[0][1], bytes);
  assert.equal(await normalizeRscExport(f.root), 2);
  assert.equal(await normalizeRscExport(f.root), 0);
  for (const [source, target] of pairs) {
    await assert.rejects(f.read(source), { code: 'ENOENT' });
    assert.deepEqual(await f.read(target), bytes);
  }
  assert.deepEqual(await f.read('contact/__next.contact.__PAGE__.txt'), bytes);
  assert.deepEqual(await f.read('projects/example.html'), bytes);
});

test('rejects conflicting bytes before making any changes', async (t) => {
  const f = await fixture(t);
  await f.write('about/__next._tree.txt');
  await f.write('about/__next.about/__PAGE__.txt');
  await f.write('services/__next._tree.txt');
  await f.write('services/__next.services/__PAGE__.txt');
  await f.write('services/__next.services.__PAGE__.txt');
  await assert.rejects(normalizeRscExport(f.root), /Conflicting RSC export destination/);
  await assert.rejects(f.read('about/__next.about.__PAGE__.txt'), { code: 'ENOENT' });
  assert.equal(String(await f.read('about/__next.about/__PAGE__.txt')), 'about/__next.about/__PAGE__.txt');
});

test('rejects ambiguous case-insensitive flattened names', async (t) => {
  const f = await fixture(t);
  await f.write('nested/__next._tree.txt');
  await f.write('nested/__next.nested/__PAGE__.txt');
  await f.write('nested/__next.nested/b.C.txt');
  await f.write('nested/__next.nested/b/c.txt');
  await assert.rejects(normalizeRscExport(f.root), /Multiple RSC payloads/);
});

test('rejects unfamiliar payload formats or missing route markers', async (t) => {
  const f = await fixture(t);
  await f.write('new/__next.new/__PAGE__.txt');
  await assert.rejects(normalizeRscExport(f.root), /Unexpected Next.js static RSC export structure/);
  await f.write('new/__next._tree.txt');
  await f.write('new/__next.new/segment.rsc');
  await assert.rejects(normalizeRscExport(f.root), /Unexpected Next.js static RSC export structure/);
  await assert.rejects(f.read('new/__next.new.__PAGE__.txt'), { code: 'ENOENT' });
});