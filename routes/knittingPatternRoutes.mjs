import express from "express";
import {
  getAllPatterns,
  getPatternById,
  createPattern,
  updatePattern,
  deletePattern,
} from "../controllers/knittingPatternsController.mjs";

const router = express.Router();

router.get("/patterns", getAllPatterns);
router.get("/patterns/:id", getPatternById);
router.post("/patterns", createPattern);
router.put("/patterns/:id", updatePattern);
router.delete("/patterns/:id", deletePattern);

export default router;
