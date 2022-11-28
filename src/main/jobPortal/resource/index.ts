import express from "express";

import authenticationMiddleware from "../middleware/authenticationMiddleware";
import authRouter  from "./AuthResource";
import userRouter from "./UserResource";

const rootRouter = express.Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/me", authenticationMiddleware, userRouter);

export default rootRouter;
