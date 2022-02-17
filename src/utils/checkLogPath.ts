import fs from 'fs';

export function checkLogPath(): string | undefined {
  if (process.env.ENVIRONMENT === 'development') return undefined;

  const logDir = __dirname + '/logs';
  const logPath = `${logDir}/${process.env.LOG_FILE_NAME || 'server.log'}`;

  // check for logs folder
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }

  if (!fs.existsSync(logPath)) {
    fs.closeSync(fs.openSync(logPath, 'w'));
  }

  return logPath;
}
