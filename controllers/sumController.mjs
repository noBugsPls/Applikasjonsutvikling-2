import HTTP_CODES from "../utils/httpCodes.mjs";

export function getSum(req, res, next) {
    const a = parseFloat(req.params.a);
    const b = parseFloat(req.params.b);
    const sum = a + b;
  
    if(isNaN(a) || isNaN(b)) {
      res.status(HTTP_CODES.CLIENT_ERROR.BAD_REQUEST).send("Invalid input. You need to provide two numbers.").end();
    }
  
    res.status(HTTP_CODES.SUCCESS.OK).send(`The sum of ${a} + ${b} = ${sum}`).end();
  }