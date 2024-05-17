import env from "dotenv";
env.config();
import mongoose from "mongoose";
import { Player, PlayerModel } from "./model/player";
import { Hanchan, HanchanModel } from "./model/hanchan";
import parseDateString from "./utils/parseDate";
import { Score } from "./model/score";
import { GoogleSpreadsheetFactory } from "./factory/doc";
import * as constants from "./google/constants"
import { getPlayersNameFromSheet, getRowObjectFromSheet } from "./google/sheet";
import { insertPlayers } from "./model/query/player";
const uri = process.env.MONGO_URI as string;

(async () => {
  const factory = new GoogleSpreadsheetFactory
  const doc = await factory.createGoogleSheetDoc()
  const playersName = await getPlayersNameFromSheet(doc, constants.PLAYERS_NAME_SHEETID)
  try {
    await mongoose.connect(uri);
    await insertPlayers(playersName)

  } catch(error) {
    console.error(error);
  } finally {
    await mongoose.connection.close();
    console.log("db connection closed");
  }
})()
