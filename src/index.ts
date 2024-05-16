import env from "dotenv";
env.config();
import mongoose from "mongoose";
const uri = process.env.MONGO_URI as string;

async function run() {
  try {
    await mongoose.connect(uri);
    console.log(
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
