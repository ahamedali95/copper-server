import 'reflect-metadata';
import './setup';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import addRequestId from 'express-request-id';
import './config/database';
import morganMiddleware from './middleware/morganMiddleware';
import {initDbConnection} from "./config/database";
import bodyParser from 'body-parser';
import authenticationMiddleware from "./middleware/authenticationMiddleware";
import httpContext from 'express-http-context';
import cookieParser from 'cookie-parser';

const app = express();
app.use(addRequestId());
app.use(cookieParser());
app.use(morganMiddleware);
app.use(helmet());
app.use(cors({ exposedHeaders: "authorization", credentials: true }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(httpContext.middleware);
// app.use(authenticationMiddleware)

process.on('uncaughtException', function (exception) {
    // handle or ignore error
});

app.set('port', process.env.PORT || 3000);


const init = async () => {
    await initDbConnection();

    app.listen(app.get('port'), function() {
     console.log('Express listening on port ' + process.env.PORT || 3000);
    });
    const rootRouter = await import('./resource');

    app.use('/api/v1', rootRouter.default);
};

init();


