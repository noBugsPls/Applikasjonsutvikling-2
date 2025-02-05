
import HTTP_CODES from "../utils/httpCodes.mjs";
import { poem, quotes } from "../data/poemData.mjs";

export function getPoem(req, res, next) {
    res.status(HTTP_CODES.SUCCESS.OK).send(poem).end();
  }
  
  export function getQuote(req, res, next) {
    const randomQuoteNumber = Math.floor(Math.random() * quotes.length);
    res.status(HTTP_CODES.SUCCESS.OK).send(quotes[randomQuoteNumber]).end();
  }