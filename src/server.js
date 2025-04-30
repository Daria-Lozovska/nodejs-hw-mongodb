import express from "express";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import contactsRouter from "./routes/contacts.js";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();

export const setupServer = () => {
  const app = express();

  app.use(logger("dev"));
  app.use(cors());
  app.use(express.json());

  // Routes
  app.use("/auth", authRouter);
  app.use("/contacts", contactsRouter);

  // 404 handler for unknown routes
  app.use((req, res) => {
    res.status(404).json({ status: 404, message: "Route not found" });
  });

  // Global error handler
  app.use(errorHandler);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
};
