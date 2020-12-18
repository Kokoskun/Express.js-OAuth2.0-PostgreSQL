const outputResponse = require("../../../utils/output.response");
const JWT = require("jsonwebtoken");
// Validate Access Tokens
exports.sign = (req, res) => {
  const headers = req.headers;
  const authorization = headers.authorization;
  if (authorization) {
    const access = authorization.split(" ");
    const accessBody = access[1];
    const grantType = req.body.grant_type;
    if (accessBody && grantType && access[0] === "Basic" && grantType === "client_credentials") {
      const buffer = Buffer.from(accessBody, "base64");
      const client = buffer.toString("utf8");
      const clientText = process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET;
      if (client === clientText) {
        const iat = Date.now() / 1000;
        //3 hour of expiration
        const timeExp = 60 * 60 * 3;
        const token = JWT.sign({ iat: iat, exp: iat + timeExp }, process.env.JWT_KEY, { algorithm: "HS256" });
        return outputResponse.ok(res, {
          token_type: "Bearer",
          access_token: token,
          expires_in: timeExp
        });
      } else {
        return outputResponse.forbidden(res, null, "Access Denied");
      }
    } else {
      return outputResponse.forbidden(res, null, "Access Denied");
    }
  } else {
    return outputResponse.unauthorized(res, null, "Unauthorized");
  }
};
