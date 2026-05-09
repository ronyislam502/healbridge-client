import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";
import { TUser } from "@/redux/features/auth/authSlice";


const AuthRoutes = ["/login", "/register"];

type Role = keyof typeof roleBasedRoutes;

const roleBasedRoutes = {
  PATIENT: [/^\/patient/],
  ADMIN: [/^\/admin/],
  DOCTOR: [/^\/doctor/],
};

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;
  // console.log("token", accessToken);

  let user = null;

  if (accessToken) {
    user = jwtDecode(accessToken) as TUser;
  }

  if (!user) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
    }
  }

  if (user?.role && roleBasedRoutes[user?.role as Role]) {
    const routes = roleBasedRoutes[user?.role as Role];

    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/patient", "/patient/:page*", "/admin", "/admin/:page*", "/doctor", "/doctor/:page*"],
};
