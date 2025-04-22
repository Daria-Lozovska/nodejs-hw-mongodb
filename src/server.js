import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.js";
import contactsRouter from "./routes/contacts.js";

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cookieParser());

  app.use("/auth", authRouter);
  app.use("/contacts", contactsRouter);

  app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      status: err.status || 500,
      message: err.message || "Server error",
    });
  });

  app.get("/", (req, res) => {
  res.send("API is working! 🚀");
  });

  app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running on port ${process.env.PORT}`);
  });
};
