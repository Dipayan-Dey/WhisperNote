import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import letterRoutes from "./src/routers/letterRoutes.js";

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PATCH", "DELETE"],
}));

app.use(express.json());

app.get("/", (_, res) => {
  res.json("Love Letter API running on AWS Lambda 🚀");
});

app.use("/", letterRoutes);

// 👇 IMPORTANT: export app (NO listen)
export default app;
