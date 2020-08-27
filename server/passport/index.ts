import * as passport from "passport";

import strategies from "./strategies";
import { IUser } from "../models/User";

strategies.map((strategy) => passport.use(strategy));

passport.serializeUser(function (user: IUser, done: any) {
  done(null, user);
});

export default passport;
