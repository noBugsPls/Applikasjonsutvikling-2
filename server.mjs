import express from "express";
import HTTP_CODES from "./utils/httpCodes.mjs";

import sumRoutes from "./routes/sumRoutes.mjs";
import poemRoutes from "./routes/poemRoutes.mjs";
import deckRoutes from "./routes/deckRoutes.mjs";

const server = express();
const port = process.env.PORT || 8000;

server.set("port", port);
server.use(express.static("public", { extensions: ["html"] }));

server.use("", sumRoutes);
server.use("", poemRoutes);
server.use("", deckRoutes);

//------------------------ 404 error-code ------------------------
server.use((req, res, next) => {
    res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).send("Page not found.").end();
});

server.listen(server.get("port"), function () {
  console.log("server running", server.get("port"));
});




