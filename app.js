import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
