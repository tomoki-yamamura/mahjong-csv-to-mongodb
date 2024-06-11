import mongoose, { Model, Schema } from 'mongoose'
export interface Player extends Document {
  name: string
}

const playerSchema = new Schema<Player>({
  name: {
    type: 'String',
    required: true,
  },
})

export const PlayerModel: Model<Player> = mongoose.model<Player>(
  'Player',
  playerSchema,
)
