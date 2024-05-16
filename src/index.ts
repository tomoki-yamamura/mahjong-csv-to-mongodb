import env from "dotenv";
env.config();
import mongoose from "mongoose";
import { Player, PlayerModel } from "./model/player";
import { Hanchan, HanchanModel } from "./model/hanchan";
import parseDateString from "./utils/parseDate";
import { Score } from "./model/score";
const uri = process.env.MONGO_URI as string;

async function run() {
  try {
    await mongoose.connect(uri);
    const players = await PlayerModel.find({});
    const hasshyID = players.filter((player: Player) => player.name === "HASSYHHH")[0].id as mongoose.Types.ObjectId;
    const tmkID = players.filter((player: Player) => player.name === "tmkkk")[0].id as mongoose.Types.ObjectId;
    const ikisugiID = players.filter((player: Player) => player.name === "イキスギコード")[0].id as mongoose.Types.ObjectId;

    const scoreData: Score[] = [
      { playerId: hasshyID, point: -43 },
      { playerId: tmkID, point: 55 },
      { playerId: ikisugiID, point: -12 },
    ]
    
    const hanchanData: Hanchan = {
      date: parseDateString("2024-03-31", "19:16"),
      mode: "3player",
      scores: scoreData,
    }
    const result = await HanchanModel.create(hanchanData)
    console.log(
      result,
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch(error) {
    console.error(error);
  } finally {
    await mongoose.connection.close();
    console.log("db connection closed");
  }
}
run().catch(console.dir);
