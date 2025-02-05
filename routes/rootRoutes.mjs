import express from "express";
import { getRoot } from "../controllers/rootController.mjs";

const router = express.Router();

router.get("/", getRoot);

export default router;