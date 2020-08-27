import { model, Model, Document, Schema, Types } from "mongoose";

export interface Log extends Document {
  userId: string;
}

export const LogSchema: Schema = new Schema(
  {
    userId: { type: Types.ObjectId, required: true },
  },
  { timestamps: true }
);

const Log: Model<Log> = model("Log", LogSchema);

export default Log;
