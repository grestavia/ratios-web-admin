import { NextResponse } from "next/server";
import { getSession } from "./libs/session";

export default async function middleware(req) {
  const session = await getSession();

  if (!session.token && req.nextUrl.pathname !== "/auth/login") {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico).*)"],
};
