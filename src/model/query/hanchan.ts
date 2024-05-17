import mongoose from "mongoose";
import { Score } from "../../google/score";
import { Hanchan, HanchanModel } from "../hanchan";
import { PlayerModel } from "../player";

export async function insertHanchans(scores: Score[]): Promise<void> {
  try {
    const existingHanchan = await HanchanModel.find({}, { date: 1 });
    const existingDates: Date[] = existingHanchan.map((doc: Hanchan) => doc.date)
    const insertScores: Score[] = scores.filter((score: Score) => !existingDates.includes(score.Date))
    await buildParams(insertScores)
    if (insertScores.length === 0) return;
  } catch (error) {
    throw error
  }
}

async function buildParams(scores: Score[]) {
  const playerIdMap = await getPlayerIds()

  console.log(playerIdMap);
  console.log(scores);
  
  
}

async function getPlayerIds(): Promise<Map<string, mongoose.Types.ObjectId>> {
  const playerIdMap = new Map<string, mongoose.Types.ObjectId>();
  try {
    const players = await PlayerModel.find({});
    players.forEach(player => {
      playerIdMap.set(player.name, player._id);
    });
    return playerIdMap;
  } catch (error) {
    throw error;
  }
}