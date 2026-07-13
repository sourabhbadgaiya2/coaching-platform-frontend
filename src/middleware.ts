import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const role = request.cookies.get("user_role")?.value;
  const { pathname } = request.nextUrl;

  const isAuthRoute =
    pathname.startsWith("/login") || pathname.startsWith("/register");
  const isAdminRoute = pathname.startsWith("/admin");
  const isStudentRoute = pathname.startsWith("/student");

  if (isAuthRoute && token) {
    return NextResponse.redirect(
      new URL(
        role === "admin" ? "/admin/dashboard" : "/student/dashboard",
        request.url,
      ),
    );
  }

  if ((isAdminRoute || isStudentRoute) && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Role mismatch check — student admin route access na kare, aur vice versa
  if (isAdminRoute && role !== "admin") {
    return NextResponse.redirect(new URL("/student/dashboard", request.url));
  }
  if (isStudentRoute && role !== "student") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/admin/:path*", "/student/:path*", "/login", "/register"],
};
