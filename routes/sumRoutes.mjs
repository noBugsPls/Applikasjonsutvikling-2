import express from "express";
import { getSum } from "../controllers/sumController.mjs";

const router = express.Router();

router.post("/tmp/sum/:a/:b", getSum);

export default router;