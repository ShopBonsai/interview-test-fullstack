import * as dotenv from "dotenv";
dotenv.config();

import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as session from "express-session";
import * as cookieParser from "cookie-parser";

import connectToDB from "./db";
import server from "./apollo";
import passport from "./passport";
import routes from "./routes";

const { SESSION_SECRET } = process.env;

const { PORT = 3000, CLIENT_URL } = process.env;

const app = express();

const corsOptions = {
  origin: CLIENT_URL,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(
  bodyParser({
    extended: true,
  })
);
app.use(cookieParser());
app.use(
  session({
    secret: SESSION_SECRET,
  })
);
app.use(passport.initialize());

app.use(routes);

server.applyMiddleware({ app, cors: false });

const main = async () => {
  await connectToDB();
  app.listen({ port: PORT }, () => {
    console.log(
      `Server running on http://localhost:${PORT}${server.graphqlPath}`
    );
  });
};

main();
