import mongoose from "mongoose";
import { PlayerModel } from "../model/player";

export async function getPlayerIdByName(name: string): Promise<mongoose.Types.ObjectId | null> {
  const player = await PlayerModel.findOne({name}).exec()
  return player ? player._id : null;
}
