import express from "express";
import HTTP_CODES from "./utils/httpCodes.mjs";
import log from "./middleware/log.mjs";
import { LOGG_LEVELS } from "./middleware/log.mjs";

import { sessionMiddleware, countVisits} from "./middleware/session.mjs";

import knittingPatternRoutes from "./routes/knittingPatternRoutes.mjs";


const ENABLE_LOGGING = false;

const server = express();
const port = process.env.PORT || 8000;

const logger = log(LOGG_LEVELS.VERBOSE);

server.set("port", port);

server.use(express.json());
server.use(sessionMiddleware);
server.use(countVisits);
server.use(logger);

server.use("", knittingPatternRoutes);
server.use(express.static("public"));

server.get("/visits", (req, res) => {
  res.json({
    total_visits: req.session.visits.total,
    path_visits: req.session.visits.paths,
  });
});


//------------------------ 404 error-code ------------------------
server.use((req, res, next) => {
  res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).send("Page not found.").end();
});

server.listen(server.get("port"), function () {
  console.log("server running", server.get("port"));
});


export default server;



