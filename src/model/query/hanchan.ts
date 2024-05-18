import mongoose from "mongoose";
import { Score, Users } from "../../google/score";
import { Hanchan, HanchanModel } from "../hanchan";
import { PlayerModel } from "../player";
import { buildScoreParams } from "./score";
import { PlayedDate } from "../../domain/value/date";

export async function insertHanchans(scores: Score[]): Promise<Hanchan[]> {
  try {
    const insertScores = await distinctInsertScores(scores);
    if (insertScores.length === 0) return [];
    const params = await buildParams(insertScores);
    const result: Hanchan[] = await HanchanModel.insertMany(params);
    return result;
  } catch (error) {
    throw error;
  }
}

async function distinctInsertScores(scores: Score[]): Promise<Score[]> {
  const existingHanchan = await HanchanModel.find({}, { date: 1 });
  const existingDates: [] = existingHanchan.map((doc: Hanchan) => doc.date);
  const result: Score[] = scores.filter(
    (score: Score) => !existingDates.some((date: PlayedDate) => date.isEqualTo(score.Date))
  );
  console.log(result);
  
  // const result: Score[] = scores.filter(
  //   (score: Score) => !existingDates.includes(score.Date.isEqualTo())
  // );
  return result;
}

async function buildParams(scores: Score[]) {
  const playerIdMap = await getPlayerIds();
  const mode =
    Object.keys(scores[0].Users).length === 3 ? "3player" : "4player";
  const insertManyParams: Hanchan[] = scores.map((score: Score) => {
    const hanchan: Hanchan = {
      date: score.Date,
      mode: mode,
      scores: buildScoreParams(score.Users, playerIdMap),
    };
    return hanchan;
  });
  return insertManyParams;
}

async function getPlayerIds(): Promise<Map<string, mongoose.Types.ObjectId>> {
  const playerIdMap = new Map<string, mongoose.Types.ObjectId>();
  try {
    const players = await PlayerModel.find({});
    players.forEach((player) => {
      playerIdMap.set(player.name, player._id);
    });
    return playerIdMap;
  } catch (error) {
    throw error;
  }
}