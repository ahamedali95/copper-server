import "reflect-metadata";
import "./setup";
import "./config/database";

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import httpContext from "express-http-context";
import addRequestId from "express-request-id";
import helmet from "helmet";

import { initDbConnection } from "./config/database";
import morganMiddleware from "./middleware/morganMiddleware";
import logger from "./config/logger";

const app = express();
app.use(addRequestId());
app.use(cookieParser());
app.use(morganMiddleware);
app.use(helmet());
app.use(cors({ exposedHeaders: "authorization", credentials: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(httpContext.middleware);

app.set("port", process.env.PORT || 3000);


const init = async () => {
    await initDbConnection();

    app.listen(app.get("port"), function() {
        logger.info("Express listening on port " + app.get("port") || 3000);
    });
    const rootRouter = await import("./resource");

    app.use("/api/v1", rootRouter.default);
};

init();


