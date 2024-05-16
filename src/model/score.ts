import mongoose from "mongoose";
export interface Score extends Document {
  playerId: mongoose.Types.ObjectId;
  point: number;
}
