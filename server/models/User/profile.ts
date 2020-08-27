import { Schema } from "mongoose";

export interface Profile {
  name: string;
  givenName?: string;
  familyName?: string;
}

const Profile: Schema = new Schema(
  {
    name: { type: String, default: null },
    givenName: { type: String, default: null },
    familyName: { type: String, default: null },
  },
  { _id: false }
);

export default Profile;
