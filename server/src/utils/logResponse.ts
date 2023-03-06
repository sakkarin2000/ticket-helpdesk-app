import { Request, Response, NextFunction } from 'express';
const getBangkokTime = () => {
  const now = new Date();
  return now.toLocaleString('en-US', {
    timeZone: 'Asia/Bangkok',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

const logResponse = (req: Request, res: Response, next: NextFunction) => {
  const start = new Date();
  res.on('finish', () => {
    const statusCode = res.statusCode;
    const duration = Number(new Date()) - Number(start);
    console.log(
      `[${getBangkokTime()}] ${req.connection.remoteAddress} requested ${
        req.originalUrl
      } and returned ${statusCode} in ${duration}ms`,
    );
  });
  next();
};

export default logResponse;
