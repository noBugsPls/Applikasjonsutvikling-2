import express from "express";
import { createDeckHandler, getCardHandler, showDeckHandler, shuffleDeckHandler } from "../controllers/deckController.mjs";

const router = express.Router();

router.post("", createDeckHandler);

router.get("/:deck_id/card", getCardHandler);

router.get("/:deck_id", showDeckHandler);

router.patch("/shuffle/:deck_id", shuffleDeckHandler);

export default router;