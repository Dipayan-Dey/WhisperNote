import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./src/config/db.js";
// import connectDB from "./config/db.js";
// import letterRoutes from "./routes/letterRoutes.js";
import letterRoutes from "./src/routers/letterRoutes.js";
connectDB();

const app = express();
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true,
}));
app.use(express.json());
app.get("/", (_, res) => {
  res.send("Love Letter API is running...");
});
app.use("/", letterRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
