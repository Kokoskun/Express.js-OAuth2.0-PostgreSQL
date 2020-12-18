const Logger = require("./logger");
const sendResponse = (res, statusCode = 200, body = null, error = null, errorMessage = null) => {
  let response = {};
  if (statusCode.toString().substr(0, 1) === "2") {
    response.result = "success";
    response.json = body;
  } else {
    response.result = "error";
    if (error) {
      response.err = error;
    }
    response.message = errorMessage;
    Logger.error(errorMessage);
  }
  return res.status(statusCode).send(response);
};
exports.ok = (res, body = null) => sendResponse(res, 200, body);
exports.created = (res, body = null) => sendResponse(res, 201, body);
exports.badRequest = (res, error = null, errorMessage = null) => sendResponse(res, 400, null, error, errorMessage);
exports.unauthorized = (res, error = null, errorMessage = null) => sendResponse(res, 401, null, error, errorMessage);
exports.forbidden = (res, error = null, errorMessage = null) => sendResponse(res, 403, null, error, errorMessage);
exports.notFound = (res, error = null, errorMessage = null) => sendResponse(res, 404, null, error, errorMessage);
exports.internalServerError = (res, error = null, errorMessage = null) => sendResponse(res, 500, null, error, errorMessage);
