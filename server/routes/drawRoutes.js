import express from "express";
import { runDraw } from "../controllers/drawController.js";

const router = express.Router();

router.get("/run", runDraw);

export default router;