import { promises as fs } from "fs";
import path from "path";

const logsDir = path.resolve("logs");

class Logger {
  private logFilePath: string;

  constructor() {
    this.logFilePath = path.join(logsDir, `logs-${this.getTimestamp()}.log`);
    this.ensureLogsDir();
  }

  private async ensureLogsDir() {
    try {
      await fs.mkdir(logsDir, { recursive: true });
    } catch (err) {
      console.error("[Logger] Failed to create logs directory:", err);
    }
  }

  private getTimestamp(): string {
    return new Date().toISOString().replace(/[:.]/g, "-");
  }

  private async log(level: string, message: string) {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] [${level.toUpperCase()}] ${message}\n`;
    try {
      await fs.appendFile(this.logFilePath, logEntry, "utf8");
    } catch (err) {
      console.error("[Logger] Failed to write log:", err);
    }
  }

  async info(message: string) {
    await this.log("info", message);
  }

  async warn(message: string) {
    await this.log("warn", message);
  }

  async error(message: string) {
    await this.log("error", message);
  }
}

const logger = new Logger();
export default logger;
