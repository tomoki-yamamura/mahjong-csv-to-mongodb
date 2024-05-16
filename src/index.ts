import env from "dotenv";
env.config();
import mongoose from "mongoose";
import { PlayerModel } from "./model/player";
const uri = process.env.MONGO_URI as string;

async function run() {
  try {
    await mongoose.connect(uri);
    const players = await PlayerModel.find({});
    console.log(
      players,
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
