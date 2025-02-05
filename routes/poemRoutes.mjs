
import express from "express";
import { getPoem, getQuote} from "../controllers/poemController.mjs";

const router = express.Router();

router.get("/tmp/poem", getPoem);

router.get("/tmp/quote", getQuote);

export default router;