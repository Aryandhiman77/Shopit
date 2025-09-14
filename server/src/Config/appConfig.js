export const APP_URL =
  process.env.NODE_ENV === "production"
    ? `${process.env.PROTOCOL}://${process.env.DOMAIN}`
    : `${process.env.DEV_PROTOCOL}://${process.env.DEV_DOMAIN}:${process.env.PORT}`;
