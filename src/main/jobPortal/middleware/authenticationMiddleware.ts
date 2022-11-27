import {Request, Response, NextFunction} from "express";
import {StatusCodes} from "http-status-codes";
import {BaseErrorResponse, ErrorDetail} from "../dto/response/BaseErrorResponse";
import jwt, {JwtPayload} from 'jsonwebtoken';
import httpContext from 'express-http-context';

const authenticationMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.cookies['access-token'];

    if (!token) {
        const baseErrorResponse = new BaseErrorResponse();
        const errorDetail = new ErrorDetail();
        errorDetail._title = "Access Denied";
        errorDetail._detail = "No token provided to authenticate user";
        baseErrorResponse.addError(errorDetail);

        //@ts-ignore
       return res.status(StatusCodes.UNAUTHORIZED).json(baseErrorResponse).send();
    }

    try {
        const decoded = jwt.verify(token!, 'privateKey') as JwtPayload;
        req.user = { ...(req.user ?? {}), userId: decoded?.email };
        httpContext.set("user", req.user);
        next();
    } catch (e) {
        const baseErrorResponse = new BaseErrorResponse();
        const errorDetail = new ErrorDetail();
        errorDetail._title = "Access Denied";
        errorDetail._detail = "Provided token is not valid";
        baseErrorResponse.addError(errorDetail);

        res.status(StatusCodes.UNAUTHORIZED).json(baseErrorResponse).send();
    }
};

export default authenticationMiddleware;