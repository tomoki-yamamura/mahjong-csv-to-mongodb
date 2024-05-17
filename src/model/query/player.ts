import { Player, PlayerModel } from "../player";

export async function insertPlayers(playerNames: string[]): Promise<Player[]> {
  try {
    const existingPlayers = await PlayerModel.find({ name: { $in: playerNames } });
    const existingNames = existingPlayers.map(player => player.name);
    const newNames = playerNames.filter(name => !existingNames.includes(name));
    const newPlayers = newNames.map(name => ({ name: name }));
    const result: Player[] = await PlayerModel.insertMany(newPlayers);
    return result
  } catch (error) {
    console.error("Error inserting players:", error);
    throw error;
  }
}
