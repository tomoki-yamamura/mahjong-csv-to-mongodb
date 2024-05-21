import mongoose, { Schema, Types } from "mongoose";
import ScoreSheet from "../../google/score";
import { PlayerIdMap } from "./player";
import { Score, ScoreModel, mode } from "../score";

export function buildScoreParams(scores: ScoreSheet[], playerIdMap: Map<string, Schema.Types.ObjectId>, mode: mode): Score[] {
  const scoreParams = scores.map((score: ScoreSheet) => {
    const { ID, Date, Users } = score
    const result = Object.entries(Users).map(([key, value]) => {
      const score: Score = {
        playerId: playerIdMap.get(key)!,
        point: Number(value),
        mode: mode,
        date: Date
      }
      return score
    })
    return result
  })
  return scoreParams.flat()
}

export async function insertScores(scores: ScoreSheet[], map: PlayerIdMap, mode: mode) {
  const latestScore = await ScoreModel.findOne({ mode: mode }).sort({ date: -1 }).exec();
  if (latestScore === null) {
    const params = buildScoreParams(scores, map, mode)
    await ScoreModel.insertMany(params);
  } else {
    const lastDate = latestScore.date
    const filteredScore = scores.filter((score: ScoreSheet) => score.Date > lastDate)
    const params = buildScoreParams(filteredScore, map, mode)
    await ScoreModel.insertMany(params);
  }
}
