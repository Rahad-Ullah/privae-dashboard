import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { myFetch } from "./utils/myFetch";
import { EUserRole } from "./enums/userEnums";



 
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
 
  const isPublicPath = [
    "/login",
    "/privacy-policy",
    "/terms-condition",
  ].includes(path);
 
  const token = request.cookies.get("accessToken")?.value;
 
  
  if (!isPublicPath && !token) {
    const loginUrl = new URL("/login", request.nextUrl);
    loginUrl.searchParams.set("callbackUrl", path);
    return NextResponse.redirect(loginUrl);
  }
 
  
  if (token && !isPublicPath) {
    const res = await myFetch("/user/profile", { token });
    const userRole = res?.data?.role;
 
    if (userRole !== EUserRole.SUPER_ADMIN && userRole !== EUserRole.ADMIN) {
      const response = NextResponse.redirect(new URL("/login", request.nextUrl));
      response.cookies.delete('accessToken');
      response.cookies.delete('userRole');
      return response;
    }
  }
}
 
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};