import express from "express";
import cors from "cors";

import resumeRoutes from "./routes/resume.routes.js";
import enhanceRoutes from "./routes/enhance.route.js";
import summaryRoutes from "./routes/summary.route.js";
import projectRoutes from "./routes/project.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/resume", resumeRoutes);
app.use("/api/enhance", enhanceRoutes); 
app.use("/api/summary",summaryRoutes);
app.use("/api/project", projectRoutes);


export default app;
