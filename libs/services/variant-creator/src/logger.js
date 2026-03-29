const fs = require("fs");
const path = require("path");

const LOG_LEVELS = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

class Logger {
  constructor(options = {}) {
    this.logDir = options.logDir || "./logs";
    this.logFile = options.logFile || path.join(this.logDir, "variant-creator.log");
    this.level = LOG_LEVELS[options.level || "info"];
    this.consoleOutput = options.consoleOutput !== false;
    this.fileOutput = options.fileOutput !== false;

    // Ensure log directory exists
    if (this.fileOutput && !fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }

    // Clear log file if fresh start
    if (this.fileOutput && !options.append) {
      try {
        fs.writeFileSync(this.logFile, "");
      } catch (err) {
        console.error("Failed to initialize log file:", err.message);
      }
    }
  }

  getTimestamp() {
    const now = new Date();
    return now.toISOString().replace("T", " ").slice(0, 23);
  }

  formatMessage(levelName, message, data) {
    const timestamp = this.getTimestamp();
    const levelPad = levelName.toUpperCase().padEnd(5);
    let msg = `[${timestamp}] [${levelPad}] ${message}`;

    if (data && Object.keys(data).length > 0) {
      msg += " " + JSON.stringify(data);
    }

    return msg;
  }

  log(levelName, message, data = {}) {
    const levelNum = LOG_LEVELS[levelName] ?? LOG_LEVELS.info;

    if (levelNum > this.level) {
      return;
    }

    const formatted = this.formatMessage(levelName, message, data);

    // Console output
    if (this.consoleOutput) {
      const consoleMethod = levelName === "error" ? "error" : "log";
      console[consoleMethod](formatted);
    }

    // File output
    if (this.fileOutput) {
      try {
        fs.appendFileSync(this.logFile, formatted + "\n", "utf8");
      } catch (err) {
        console.error("Failed to write to log file:", err.message);
      }
    }
  }

  error(message, data) {
    this.log("error", message, data);
  }

  warn(message, data) {
    this.log("warn", message, data);
  }

  info(message, data) {
    this.log("info", message, data);
  }

  debug(message, data) {
    this.log("debug", message, data);
  }

  getLogFile() {
    return this.logFile;
  }
}

function createLogger(options = {}) {
  return new Logger(options);
}

module.exports = { Logger, createLogger, LOG_LEVELS };
