import Google from "./google";

import * as express from "express";

const app = express();

app.use("/google", Google);

app.get("/logout", (_, res) => {
  res.clearCookie("jwt");
  res.clearCookie("access-token-service");
  res.cookie("isSignedIn", false);
  res.sendStatus(200);
});

export default app;
