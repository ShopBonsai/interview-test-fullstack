import * as express from "express";

import auth from "./auth";

const app = express();

app.use("/auth", auth);

export default app;
