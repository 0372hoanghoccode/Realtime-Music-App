import express from 'express';
import dotenv from 'dotenv';
import { clerkMiddleware } from "@clerk/express";
import fileUpload from "express-fileupload";
import path from "path";
import cors from "cors";
import fs from "fs";
import cron from "node-cron";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";

import adminRoutes from './routes/admin.route.js';
import authRoutes from './routes/auth.route.js';
import songRoutes from './routes/song.route.js';
import albumRoutes from './routes/album.route.js';
import statsRoutes from './routes/stat.route.js';
import userRoutes from './routes/user.route.js';
import playlistRoutes from './routes/playlist.route.js';
import likeRoutes from './routes/like.route.js';
import historyRoutes from './routes/history.route.js';
import { connectDB } from './lib/db.js';
import { createServer } from 'http';
import { initializeSocket } from './lib/socket.js';

dotenv.config();

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT;
const httpServer = createServer(app);
initializeSocket(httpServer);
app.use(express.json());
app.use(clerkMiddleware());
app.use(compression());
app.use(morgan("dev"));

app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? 'https://realtime-music-app-hntg.onrender.com'
    : 'http://localhost:3000',
  credentials: true
}));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024, // 10Mb max
    },
  })
);

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "*.clerk.accounts.dev", "'unsafe-inline'"],
      connectSrc: ["'self'", "*.clerk.accounts.dev", "*.clerk.accounts.io"],
      frameSrc: ["'self'", "*.clerk.accounts.dev"],
      imgSrc: ["'self'", "data:", "*.clerk.accounts.dev", "*.cloudinary.com", "res.cloudinary.com", "*.clerk.com", "img.clerk.com", "images.clerk.dev", "example.com"],
      mediaSrc: ["'self'", "*.cloudinary.com", "res.cloudinary.com"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      workerSrc: ["'self'", "blob:"],
      childSrc: ["'self'", "blob:"]
    }
  }
}));

const tempDir = path.join(process.cwd(), "tmp");
cron.schedule("0 * * * *", () => {
  if (fs.existsSync(tempDir)) {
    fs.readdir(tempDir, (err, files) => {
      if (err) {
        console.log("error", err);
        return;
      }
      for (const file of files) {
        fs.unlink(path.join(tempDir, file), (err) => { });
      }
    });
  }
});


app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/playlists", playlistRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/history", historyRoutes);


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
  });
}


app.use((err, req, res, next) => {
  res.status(500).json({ message: process.env.NODE_ENV === "production" ? "Internal server error" : err.message });
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
