import { Schema, model } from "mongoose";
export interface Player {
  name: string
}

const playerSchema = new Schema<Player>({
  name: {
    type: "String",
    required: true
  }
})

export const PlayerModel = model<Player>('Player', playerSchema)