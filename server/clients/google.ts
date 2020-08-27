import { google } from "googleapis";
import User, { AUTH_SERVICES } from "../models/User";
import { ACCESS_TOKEN_COOKIE_OPTIONS } from "../passport/cookies";

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
} = process.env;

export const GoogleClient = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI
);

export async function loginGoogle(accessToken: string, res: any) {
  const { email } = await verifyGoogleToken(accessToken, res);
  const user = await User.findOrCreate(email);
  return user;
}

export async function verifyGoogleToken(accessToken: string, res: any) {
  try {
    const tokenInfo = await GoogleClient.getTokenInfo(accessToken);
    const { email, expiry_date } = tokenInfo;

    if (Date.now() > expiry_date) {
      const newAccessToken = await getNewGoogleAccessToken(email, accessToken);
      setCookieGoogleAccessToken(res, newAccessToken);
      const newAccessTokenInfo = await GoogleClient.getTokenInfo(
        newAccessToken
      );
      return newAccessTokenInfo;
    } else {
      return tokenInfo;
    }
  } catch (e) {
    console.log({ e });
    throw new Error("GOOGLE_TOKEN_VERIFICATION:FAILED");
  }
}

export async function getNewGoogleAccessToken(
  email: string,
  oldAccessToken: string
) {
  const refreshToken = await User.getUserRefreshToken(
    email,
    AUTH_SERVICES.GOOGLE
  );
  await GoogleClient.setCredentials({
    refresh_token: refreshToken,
    access_token: oldAccessToken,
  });
  const { token: newAccessToken } = await GoogleClient.getAccessToken();
  return newAccessToken;
}

export function setCookieGoogleAccessToken(res: any, accessToken: string) {
  res.cookie("jwt", accessToken, ACCESS_TOKEN_COOKIE_OPTIONS);
}

export default GoogleClient;
