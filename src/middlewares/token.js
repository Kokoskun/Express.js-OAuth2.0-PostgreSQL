const JWT = require("jsonwebtoken");
const outputResponse = require("../utils/output.response");
exports.verify = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (authorization) {
      const access = authorization.split(" ");
      const token = access[1];
      if (token && access[0] === "Bearer") {
        JWT.verify(token, process.env.JWT_KEY, function(err, data) {
          if (err) {
            if (err.name === "TokenExpiredError") {
              return outputResponse.forbidden(res, null, "Token Expired");
            } else {
              return outputResponse.badRequest(res, null, "Failed Token Invalid");
            }
          } else {
            next();
          }
        });
      } else {
        return outputResponse.badRequest(res, null, "Invalid Token Format");
      }
    } else {
      return outputResponse.unauthorized(res, null, "Unauthorized");
    }
  } catch (error) {
    return outputResponse.unauthorized(res, null, "Unauthorized");
  }
};
