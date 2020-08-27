import { Strategy } from "passport-google-oauth20";

import Log from "../../models/Log";
import User, { AUTH_SERVICES } from "../../models/User";
import { ACCESS_TOKEN_COOKIE_OPTIONS } from "../cookies";

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
} = process.env;

export default new Strategy(
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_REDIRECT_URI,
    passReqToCallback: true,
  },
  async function (
    req: any,
    accessToken: any,
    refreshToken: any,
    profile: any,
    done: any
  ) {
    try {
      const email = profile.emails[0].value;

      const user = await User.findOrCreate(email);

      await User.storeGoogleRefreshToken(email, refreshToken);

      await Log.create({ userId: user._id });

      req.res.cookie("jwt", accessToken, ACCESS_TOKEN_COOKIE_OPTIONS);
      req.res.cookie(
        "access-token-service",
        AUTH_SERVICES.GOOGLE,
        ACCESS_TOKEN_COOKIE_OPTIONS
      );
      req.res.cookie("isSignedIn", true);

      done(null, user._id);
    } catch (e) {
      console.log("error!", e);
    }
  }
);
