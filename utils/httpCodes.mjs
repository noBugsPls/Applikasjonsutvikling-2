const HTTP_CODES = {
  SUCCESS: {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
  },
  CLIENT_ERROR: {
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
  },
  SERVER_ERROR: {
    INTERNAL_SERVER_ERROR: 500,
  },
};

export default HTTP_CODES;
