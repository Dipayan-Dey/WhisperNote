import express from "express";
import { v4 as uuidv4 } from "uuid";
import Letter from "../models/Letter.js";
import { encrypt, decrypt } from "../utils/crypto.js";

const router = express.Router();

/* CREATE LETTER */
router.post("/create", async (req, res) => {
  const id = uuidv4().replace(/-/g, "").slice(0, 12);

  const encryptedText = encrypt(req.body.text);

  const letter = new Letter({
    _id: id,
    messages: [{ text: encryptedText }]
  });

  await letter.save();
  res.json({ link: `/letter/${id}` });
});

/* GET LETTER */
router.get("/letter/:id", async (req, res) => {
  const letter = await Letter.findById(req.params.id);
  if (!letter) return res.status(404).json({ error: "Not found" });

  // 🔓 Decrypt before sending
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

  await Letter.findByIdAndUpdate(req.params.id, {
    $push: { messages: { text: encryptedText } }
  });

  res.json({ status: "Reply added" });
});

router.get("/show-all-data", async (_, res) => {
  const letters = await Letter.find({});
  res.json(letters);
});

export default router;
