const winston = require("winston");
const { createLogger, format, transports } = winston;
const path = require("path");

const defaultFormat = format.printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.File({
      filename: path.join(__dirname, "../../logs/combined.log"),
      maxsize: 200000,
      maxFiles: 10
    }),
    new transports.File({
      filename: path.join(__dirname, "../../logs/error.log"),
      level: "error",
      maxsize: 200000,
      maxFiles: 10
    })
  ]
});

// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: defaultFormat
    })
  );
}

module.exports = logger;
