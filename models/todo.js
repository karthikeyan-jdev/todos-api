import mongoose from "mongoose";

const todoShema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
}
},{timestamps: true });

export const todoModel = mongoose.model("todo", todoShema);
