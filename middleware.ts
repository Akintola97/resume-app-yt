import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";

export default function middleware(req) {
  return withAuth(req, {
    isReturnToCurrentPage: true,
    loginPage: "/api/auth/login",
    isAuthorized: ({ token }) => {
      // The user will be considered authorized if they have the permission 'eat:chips'
      return !!token;
    },
  });
}
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/document/:path"],
};
