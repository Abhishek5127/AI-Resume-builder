// routes/project.route.js
import express from "express";
import { enhanceProject } from "../controllers/project.controller.js";

const router = express.Router();

// POST /api/project/enhance
router.post("/enhance", enhanceProject);

export default router;
