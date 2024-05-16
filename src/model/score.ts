import mongoose, { Model, Schema } from "mongoose";
export interface Score extends Document {
  playerId: mongoose.Types.ObjectId;
  point: number;
}

const scoreSchema = new Schema<Score>({
  playerId: { type: Schema.Types.ObjectId, ref: 'Player', required: true },
  point: { type: Number, required: true }
});

export const ScoreModel: Model<Score> = mongoose.model<Score>('Score', scoreSchema)