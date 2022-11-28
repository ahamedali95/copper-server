
import type { Request } from "express";
import morgan, { StreamOptions } from "morgan";

import Logger from "../config/logger";

const stream: StreamOptions = {
    write: (message) => Logger.http(message)
};

const skip = () => {
    const env = process.env.NODE_ENV || "dev";
    return env !== "dev";
};

morgan.token("requestId",  (req: Request): string => req.id);

const morganMiddleware = morgan(
    ":requestId :method :url :status :response-time ms",
    { stream, skip }
);

export default morganMiddleware;