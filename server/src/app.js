import express from "express";
import cors from "cors";

import resumeRoutes from "./routes/resume.routes.js";
import enhanceRoutes from "./routes/enhance.route.js";
import summaryRoutes from "./routes/summary.route.js";
import projectRoutes from "./routes/project.route.js";

const app = express();

// -------- FIXED CORS FOR RENDER --------
app.use(cors({
  origin: [
    "https://ai-resume-builder-bu76o6x9c-abhishek5127s-projects.vercel.app",
    "https://ai-resume-builder-5koy.onrender.com"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.options("*", cors());

// ---------------------------------------
app.use(express.json());

// ROUTES
app.use("/api/resume", resumeRoutes);
app.use("/api/enhance", enhanceRoutes);
app.use("/api/summary", summaryRoutes);
app.use("/api/project", projectRoutes);

export default app;
