import env from "dotenv";
env.config();
import mongoose from "mongoose";
import { Player, PlayerModel } from "./model/player";
const uri = process.env.MONGO_URI as string;

async function run() {
  try {
    await mongoose.connect(uri);
    const players = await PlayerModel.find({});
    const hasshyID = players.filter((player: Player) => player.name === "HASSYHHH")[0].id
    console.log(
      hasshyID,
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
