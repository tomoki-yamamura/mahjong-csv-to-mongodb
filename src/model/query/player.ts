import { PlayerModel } from "../player";

export async function insertPlayers(playerNames: string[]): Promise<void> {
  try {
    const existingPlayers = await PlayerModel.find({ name: { $in: playerNames } });

    const existingNames = existingPlayers.map(player => player.name);

    const newNames = playerNames.filter(name => !existingNames.includes(name));

    const newPlayers = newNames.map(name => ({ name: name }));
    await PlayerModel.insertMany(newPlayers);

    console.log("Players inserted successfully.");
  } catch (error) {
    console.error("Error inserting players:", error);
  }
}
