import { Schema } from "mongoose";
import ScoreSheet from "../../google/score";
import { PlayerIdMap } from "./player";
import { Score, ScoreModel, mode } from "../score";

export function buildScoreParams(scores: ScoreSheet[], playerIdMap: Map<string, Schema.Types.ObjectId>, mode: mode): Score[] {
  const scoreParams = scores.map((score: ScoreSheet) => {
    const { Date, Users } = score
    const result = Object.entries(Users).map(([key, value]) => {
      const scoreDomain: Score = {
        playerId: playerIdMap.get(key)!,
        point: Number(value),
        mode: mode,
        date: Date
      }
      return scoreDomain
    })
    return result
  })
  return scoreParams.flat()
}

export async function insertScores(scores: ScoreSheet[], map: PlayerIdMap, mode: mode) {
  try {
    const latestScore = await ScoreModel.findOne({ mode }).sort({ date: -1 }).exec();
    
    const scoresToInsert = latestScore
      ? scores.filter((score: ScoreSheet) => score.Date > latestScore.date)
      : scores;

    if (scoresToInsert.length > 0) {
      const params = buildScoreParams(scoresToInsert, map, mode);
      await ScoreModel.insertMany(params);
    }
  } catch (error) {
    console.error('Error inserting scores:', error);
    throw new Error('Failed to insert scores');
  }
}
