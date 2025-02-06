import session from "express-session";
import FileStoreFactory from "session-file-store";
import fs from "node:fs/promises";
import secretMessage from "../utils/secret.mjs";

const FileStore = FileStoreFactory(session);
const SESSION_PATH = "./logs/sessions";

(async () => {
  try {
    await fs.mkdir(SESSION_PATH, { recursive: true });
  } catch (error) {
    console.error("Feil ved oppretting av session-mappe: ", error);
  }
})();

const sessionMiddleware = session({
  store: new FileStore({ path: SESSION_PATH }),
  secret: secretMessage,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true, sameSite: "strict", maxAge: 1000 * 60 * 60 * 24 },
});

const countVisits = (req, res, next) => {
  if (!req.session.visits){
    req.session.visits = { total: 0, paths: {} };
  }

  req.session.visits.total += 1;
  const path = req.path;
  if(!req.session.visits.paths){
    req.session.visits.paths = {};
  }

  req.session.visits.paths[path] = (req.session.visits.paths[path] || 0) + 1;
  
  next();
}

export {sessionMiddleware, countVisits};
