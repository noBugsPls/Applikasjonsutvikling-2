import express from "express";
import { getSum } from "../controllers/sumController.mjs";

const router = express.Router();

server.post("/tmp/sum/:a/:b", getSum);

export default router;