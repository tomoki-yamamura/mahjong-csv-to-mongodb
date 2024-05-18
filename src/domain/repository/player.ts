import mongoose from "mongoose";

interface IPlayer {
  getPlayerIds(): Promise<Map<string, mongoose.Types.ObjectId>>;
}
