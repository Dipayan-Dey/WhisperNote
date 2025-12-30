import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  text: String,
  time: { type: Date, default: Date.now }
});

const letterSchema = new mongoose.Schema({
  _id: String,
  createdAt: { type: Date, default: Date.now },
  messages: [messageSchema]
});

export default mongoose.model("Letter", letterSchema);
