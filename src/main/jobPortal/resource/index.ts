import express from 'express';
import authRouter, { AuthResource1 }  from "./AuthResource";
import userRouter from "./UserResource";
import authenticationMiddleware from "../middleware/authenticationMiddleware";

const rootRouter = express.Router();

rootRouter.use('/auth', authRouter);
rootRouter.use('/me', authenticationMiddleware, userRouter);

export default rootRouter;
