
import express from "express";
import {getPoem, getQuote} from "../controllers/poemController.mjs";

const router = express.Router();

server.get("/tmp/poem", getPoem);

server.get("/tmp/quote", getQuote);

export default router;