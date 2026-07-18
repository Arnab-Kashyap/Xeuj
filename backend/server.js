import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";

dotenv.config();

const app = express();

connectDB();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Xeuj Backend Running");
});

app.use("/api/users", userRoutes);
app.use("/api/complaints", complaintRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});