import mongoose, { Model, Schema } from "mongoose";
import { Player } from "./player";

export type mode = "3players" | "4players"
export interface Score {
  playerId: Schema.Types.ObjectId | Player;
  point: number;
  date: Date;
  mode: mode;
}

const scoreSchema = new Schema<Score>({
  playerId: {
    type: Schema.Types.ObjectId,
    ref: "Player",
    required: true,
  },
  point: {
    type: "Number",
    required: true,
  },
  date: {
    type: "Date",
    required: true,
  },
  mode: {
    type: "String",
    enum: ["3players", "4players"],
    required: true,
  },
});

export const ScoreModel: Model<Score> = mongoose.model<Score>(
  "Score",
  scoreSchema
);
