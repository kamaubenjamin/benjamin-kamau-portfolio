import { NextResponse, type NextRequest } from "next/server";
import { projects } from "@/data/projects";

const projectSlugs = new Set(projects.map((project) => project.slug));

export function middleware(request: NextRequest) {
  const slug = request.nextUrl.pathname.slice("/projects/".length);

  if (projectSlugs.has(slug)) {
    return NextResponse.next();
  }

  return NextResponse.rewrite(new URL("/_not-found", request.url), {
    status: 404,
  });
}

export const config = {
  matcher: "/projects/:slug",
};