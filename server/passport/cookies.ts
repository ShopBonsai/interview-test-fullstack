export const ACCESS_TOKEN_COOKIE_OPTIONS = {
  httpOnly: true,
  // 30 days
  maxAge: 1000 * 60 * 60 * 25 * 30,
  // flag true in production when using HTTPS
  // secure: true
};
