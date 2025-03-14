import express from "express";
import {
  getAllPatterns,
  createPattern,
  updatePattern,
  deletePattern,
} from "../controllers/patternsController.mjs";

const router = express.Router();

router.get("/patterns", getAllPatterns);
router.post("/patterns", createPattern);
router.put("/patterns/:id", updatePattern);
router.delete("/patterns/:id", deletePattern);

export default router;
