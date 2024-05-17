import mongoose from "mongoose";
import { Users } from "../../google/score";
import { Score } from "../score";

export function buildScoreParams(users: Users, playerIdMap: Map<string, mongoose.Types.ObjectId>): Score[] {
  const result = Object.entries(users).map(([key, value]) => {
    const score: Score = {
      playerId: playerIdMap.get(key)!,
      point: Number(value)
    }
    return score
  })
  return result
}
