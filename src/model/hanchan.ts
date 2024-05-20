import mongoose, { Model, Schema, Types } from "mongoose";
import { Score } from "./score";

type mode = "3players" | "4players";

export interface Hanchan {
  date: Date;
  mode: mode;
  scores: Score[];
}

const hanchanSchema = new Schema<Hanchan>({
  date: {
    type: Date,
    required: true,
  },
  mode: {
    type: String,
    enum: ["3players", "4players"],
    required: true,
  },
  scores: [
    {
      playerId: { type: Schema.Types.ObjectId, ref: "Player", required: true },
      point: { type: Number, required: true },
    },
  ],
});

export const HanchanModel: Model<Hanchan> = mongoose.model(
  "Hanchan",
  hanchanSchema
);
