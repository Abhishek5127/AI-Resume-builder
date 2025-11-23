import express from "express";
import {predictSkills,enhanceText} from '../controllers/enhance.controller.js'
const router = express.Router();

router.post("/enhance", enhanceText);
router.post("/predict-skills", predictSkills);


export default router;
