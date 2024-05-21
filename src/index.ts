import env from "dotenv";
env.config();
import mongoose from "mongoose";
import { GoogleSpreadsheetFactory } from "./factory/doc";
import * as constants from "./google/constants"
import { getPlayersNameFromSheet, getScoresObjectFromSheet,  } from "./google/sheet";
import { getPlayerIds, insertPlayers } from "./model/query/player";
import { insertScores } from "./model/query/score";
const uri = process.env.MONGO_URI as string;

(async () => {
  const factory = new GoogleSpreadsheetFactory
  const doc = await factory.createGoogleSheetDoc()
  const score3plyers = await getScoresObjectFromSheet(doc, constants.PLAYERS_3_SHEETID);
  const score4plyers = await getScoresObjectFromSheet(doc, constants.PLAYERS_4_SHEETID);
  const playersName = await getPlayersNameFromSheet(doc, constants.PLAYERS_NAME_SHEETID)
  try {
    await mongoose.connect(uri);
    await insertPlayers(playersName)
    const playerIds = await getPlayerIds();
    await insertScores(score3plyers, playerIds, "3players")
    await insertScores(score4plyers, playerIds, "4players")
    console.log("Successfuly inserted!");
  } catch(error) {
    console.error(error);
  } finally {
    await mongoose.connection.close();
    console.log("db connection closed");
  }
})()
