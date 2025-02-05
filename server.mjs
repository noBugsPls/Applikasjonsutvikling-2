import express from "express";
import HTTP_CODES from "./utils/httpCodes.mjs";
import log from "./modules/log.mjs";
import { LOGG_LEVELS, eventLogger } from "./modules/log.mjs";

import sumRoutes from "./routes/sumRoutes.mjs";
import poemRoutes from "./routes/poemRoutes.mjs";
import deckRoutes from "./routes/deckRoutes.mjs";

const ENABLE_LOGGING = false;

const server = express();
const port = process.env.PORT || 8000;

const logger = log(LOGG_LEVELS.VERBOSE);

server.set("port", port);
server.use(logger)
server.use(express.static("public"));

server.use("", sumRoutes, logger);
server.use("", poemRoutes, logger);
server.use("", deckRoutes, logger);

//------------------------ 404 error-code ------------------------
server.use((req, res, next) => {
    res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).send("Page not found.").end();
});

server.listen(server.get("port"), function () {
  console.log("server running", server.get("port"));
});




