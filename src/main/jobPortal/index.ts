import './setup';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import addRequestId from 'express-request-id';
import 'reflect-metadata';
import './config/database';
import morganMiddleware from './middleware/morganMiddleware';

const app = express();
app.use(addRequestId());
app.use(morganMiddleware);
app.use(helmet());
app.use(cors());
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function() {
    console.log('Express listening on port ' + process.env.PORT || 3000);
});

app.get('/api/v1/posts', (req, res) => {
    res.send("dddd");
   res.end();
});

