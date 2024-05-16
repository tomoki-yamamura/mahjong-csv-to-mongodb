import mongoose from "mongoose";
export interface Score {
  playerId: mongoose.Types.ObjectId;
  point: number;
}
