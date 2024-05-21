import { Schema, Types } from "mongoose";
import { Player, PlayerModel } from "../player";

export type PlayerIdMap = Map<string, Schema.Types.ObjectId>;

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

export async function getPlayerIds(): Promise<Map<string, Schema.Types.ObjectId>> {
  const playerIdMap: PlayerIdMap = new Map<string, Schema.Types.ObjectId>();
  try {
    const players = await PlayerModel.find({});
    players.forEach(player => {
      return playerIdMap.set(player.name, player.id);
    });
    return playerIdMap;
  } catch (error) {
    throw error;
  }
}