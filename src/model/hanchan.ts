import mongoose, { Model, Schema } from "mongoose";
import { Score } from "./score";

type mode = "3player" | "4player";

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
    enum: ["3player", "4player"],
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
