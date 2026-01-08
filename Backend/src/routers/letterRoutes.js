import express from "express";
import { v4 as uuidv4 } from "uuid";
import {
  createLetter,
  getLetterById,
  addReply,
  getAllLetters,
  deleteLetter
} from "../models/Letter.js";
import { encrypt, decrypt } from "../utils/crypto.js";

const router = express.Router();

/* CREATE LETTER */
router.post("/create", async (req, res) => {
  const id = uuidv4().replace(/-/g, "").slice(0, 12);

  const encryptedText = encrypt(req.body.text);

  await createLetter({
    _id: id,
    messages: [{ text: encryptedText, time: new Date() }]
  });

  res.json({ link: `/letter/${id}` });
});

/* GET LETTER */
router.get("/letter/:id", async (req, res) => {
  const letter = await getLetterById(req.params.id);
  if (!letter) return res.status(404).json({ error: "Not found" });

  const decrypted = {
    _id: letter._id,
    messages: letter.messages.map(m => ({
      text: decrypt(m.text),
      time: m.time
    }))
  };

  res.json(decrypted);
});

/* ADD REPLY */
router.post("/letter/:id", async (req, res) => {
  const encryptedText = encrypt(req.body.text);

  await addReply(req.params.id, {
    text: encryptedText,
    time: new Date()
  });

  res.json({ status: "Reply added" });
});

/* SHOW ALL */
router.get("/show-all-data", async (_, res) => {
  const letters = await getAllLetters();
  res.json(letters);
});

/* DELETE */
router.delete("/delete-one/:id", async (req, res) => {
  await deleteLetter(req.params.id);
  res.json({ status: "Letter deleted" });
});

export default router;
