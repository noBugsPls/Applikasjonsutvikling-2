import express from "express";
import { createDeckHandler, getCardHandler, showDeckHandler, shuffleDeckHandler } from "../controllers/deckController.mjs";

const router = express.Router();

router.post("/temp/deck", createDeckHandler);

router.get("/temp/deck/:deck_id/card", getCardHandler);

router.get("/temp/deck/:deck_id", showDeckHandler);

router.patch("/temp/deck/shuffle/:deck_id", shuffleDeckHandler);

export default router;