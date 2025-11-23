import express from "express";
import cors from "cors";

import resumeRoutes from "./routes/resume.routes.js";
import enhanceRoutes from "./routes/enhance.route.js";  // FIXED IMPORT
import summaryRoutes from "./routes/summary.route.js"

const app = express();

app.use(cors());
app.use(express.json());

// Correct mounting
app.use("/api/resume", resumeRoutes);
app.use("/api/enhance", enhanceRoutes); // FIXED ROUTE
app.use("/api/summary",summaryRoutes);


export default app;
