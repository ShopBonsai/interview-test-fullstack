import { model, Model, Document, Schema } from "mongoose";

import auth, { Auth } from "./auth";
import profile, { Profile } from "./profile";
import _ = require("lodash");

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

export interface IUser extends Document {
  email: string;
  auth?: Auth;
  profile?: Profile;
  role?: UserRole;
}

export const UserSchema: Schema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    auth: { type: auth, select: false },
    profile: { type: profile, required: false },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
  },
  { timestamps: true }
);

UserSchema.statics.findOrCreate = async (email: string, name: string) => {
  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      email,
    });
  }

  return user;
};

UserSchema.statics.storeGoogleRefreshToken = (
  email: string,
  refreshToken: string
) => {
  return User.findOneAndUpdate(
    { email },
    {
      $set: {
        "auth.google.refreshToken": refreshToken,
      },
    }
  );
};

export enum AUTH_SERVICES {
  GOOGLE = "google",
  PASSWORD = "password",
}

UserSchema.statics.getUserRefreshToken = async (
  email: string,
  service: AUTH_SERVICES
) => {
  const path = `auth.${service}.refreshToken`;
  const data = await User.findOne(
    { email },
    {
      [path]: 1,
    }
  );
  const refreshToken = _.get(data, path, null);
  return refreshToken;
};

export interface IUserModel extends Model<IUser> {
  findOrCreate(email: string): IUser;
  getUserRefreshToken(email: string, service: AUTH_SERVICES): string;
  storeGoogleRefreshToken(email: string, refreshToken: string): Promise<IUser>;
}

const User = model<IUser, IUserModel>("User", UserSchema);

export default User;
