import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  text: {
    iv: String,
    content: String,
    tag: String
  },
  time: { type: Date, default: Date.now }
});

const letterSchema = new mongoose.Schema({
  _id: String,
  messages: [messageSchema]
});

export default mongoose.model("Letter", letterSchema);
