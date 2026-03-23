"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { posthog } from "posthog-js";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY || "", {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com",
      loaded: (posthog) => {
        if (process.env.NODE_ENV === "development") {
          posthog.debug();
        }
      },
    });
  }, []);

  useEffect(() => {
    posthog.capture("$pageview", {
      pathname,
      search: searchParams.toString(),
    });
  }, [pathname, searchParams]);

  return <>{children}</>;
}
