import * as dotenv from "dotenv";
dotenv.config();

import * as express from "express";

import passport from "../../passport";

const { CLIENT_URL } = process.env;

const app = express();

app.get(
  "/",
  (req, _, next) => {
    const { returnTo = CLIENT_URL } = req.query;
    req.session.returnTo = returnTo;
    next();
  },
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
      "openid",
    ],
    accessType: "offline",
  })
);

app.get("/success", async (req, res) => {
  res.redirect(req.session.returnTo);
});

app.get("/failure", (_, res) => {
  console.log("failure callback :(");
  res.sendStatus(401);
});

app.get(
  "/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/google/success",
    failureRedirect: "/auth/google/failure",
  })
);

export default app;
