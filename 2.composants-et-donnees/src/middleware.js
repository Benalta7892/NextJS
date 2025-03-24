import { NextResponse } from "next/server";

export function middleware(request) {
  const url = request.nextUrl;

  if (url.pathname === "/private") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
