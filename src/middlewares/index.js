const outputResponse = require("../utils/output.response");
exports.errorHandler = (err, req, res, next) => {
  if (err.status === 401) {
    return outputResponse.unauthorized(res, err, err.message);
  }
  return outputResponse.internalServerError(res, err, err.message);
};
