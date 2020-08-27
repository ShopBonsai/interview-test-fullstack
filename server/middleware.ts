import * as dotenv from "dotenv";
dotenv.config;

import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { Types } from "mongoose";

import User, { IUser, AUTH_SERVICES } from "./models/User";
import { signToken } from "./utils";
import { loginGoogle } from "./clients/google";
import Log from "./models/Log";

const { TOKEN_SECRET } = process.env;

function verifyPassword(token: string): any {
  try {
    const payload = jwt.verify(token, TOKEN_SECRET);
    return payload;
  } catch (e) {
    return null;
  }
}

const loginJWT = async ({ res, token }: any) => {
  try {
    const payload = verifyPassword(token);
    if (payload) {
      const { userId } = payload;
      const user = await User.findOne({ _id: Types.ObjectId(userId) });
      return user;
    }
  } catch (e) {
    res.status(401).send();
  }
};

const loginAdmin = async ({
  req,
  res,
  email,
  password,
}: any): Promise<IUser | null> => {
  try {
    const userWithAuth = await User.findOne({ email }).select({ auth: 1 });

    const invalidCredentialsMessage = "Incorrect email or password.";
    if (!userWithAuth) {
      throw new Error(invalidCredentialsMessage);
    }

    if (!userWithAuth.auth) {
      return null;
    }

    const validPassword = await bcrypt.compare(
      password,
      userWithAuth.auth.password.bcrypt
    );

    if (!validPassword) {
      throw new Error(invalidCredentialsMessage);
    }

    const user = await User.findOne({ email });
    const token = await signToken({ userId: user._id.toString() });

    req.user = user;
    req.session.token = token;
  } catch (e) {
    res.status(401).send();
  }
};

export const authenticate = async (req: any, res: any) => {
  let user = null;
  const { operationName, variables } = req.body;
  if (operationName == "LoginAdmin") {
    const { email, password } = variables;
    await loginAdmin({ req, res, email, password });

    const { _id: userId } = req.user as IUser;
    await Log.create({ userId });

    return;
  }

  // you're not assuming that there is always a service.
  // you're assuming that some paths are open, and that others are locked off.
  // the job of authentication is to verify that:
  // 1) The Token provided is correct and valid.
  // 2) Get the user based on the token parameters.
  // 3) Set the user in the request

  const service = req.cookies["access-token-service"];
  const serviceAccessToken = req.cookies["jwt"];
  switch (service) {
    case AUTH_SERVICES.GOOGLE:
      user = await loginGoogle(serviceAccessToken, res);
      break;
    case AUTH_SERVICES.PASSWORD:
      user = await loginJWT({ res, token: serviceAccessToken });
      break;
  }

  if (user) {
    req.user = user;
  }
};
