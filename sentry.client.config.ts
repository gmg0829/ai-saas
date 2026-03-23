import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,

  // Performance monitoring
  tracesSampleRate: 0.1,

  // Error tracking
  replaysOnErrorSampleRate: 1.0,

  // Session replay
  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],

  // Environment
  environment: process.env.NODE_ENV,

  // Ignore errors from these paths
  ignoreErrors: [
    "ResizeObserver loop",
    "Non-Error promise rejection captured",
  ],

  // Filter transactions
  beforeSendTransaction(event) {
    // Don't send transactions from /api/health or /ping
    if (event.transaction?.includes("/api/health")) {
      return null;
    }
    return event;
  },
});
