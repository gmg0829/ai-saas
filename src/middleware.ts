import { clerkMiddleware } from "@clerk/nextjs";

export default clerkMiddleware({
  publicRoutes: [
    "/",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api/webhooks(.*)",
    "/features",
    "/pricing",
  ],
  ignoredRoutes: ["/api/webhooks(.*)"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
