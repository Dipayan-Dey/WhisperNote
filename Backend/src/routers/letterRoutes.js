import express from "express";
import { v4 as uuidv4 } from "uuid";
// import Letter from "../models/Letter";
import Letter from "../models/Letter.js";

const router = express.Router();

/* CREATE LETTER */
router.post("/create", async (req, res) => {
  const id = uuidv4().replace(/-/g, "").slice(0, 12);

  const letter = new Letter({
    _id: id,
    messages: [{ text: req.body.text }]
  });

  await letter.save();
  res.json({ link: `/letter/${id}` });
});

/* GET LETTER */
router.get("/letter/:id", async (req, res) => {
  const letter = await Letter.findById(req.params.id);
  if (!letter) return res.status(404).json({ error: "Not found" });
  res.json(letter);
});

/* ADD REPLY */
router.post("/letter/:id", async (req, res) => {
  await Letter.findByIdAndUpdate(req.params.id, {
    $push: { messages: { text: req.body.text } }
  });
  res.json({ status: "Reply added" });
});

export default router;
