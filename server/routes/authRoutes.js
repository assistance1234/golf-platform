import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

// ✅ test route add kar
router.get("/", (req, res) => {
  res.send("Auth route working ✅");
});

router.post("/register", register);
router.post("/login", login);

export default router;