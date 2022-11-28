import express, { Request, Response } from "express";

import logger from "../config/logger";
import BaseRequestDTO from "../dto/request/BaseRequestDTO";
import SignonRequestDTO from "../dto/request/SignOnRequestDTO";
import SignupRequestDTO from "../dto/request/SignupRequestDTO";
import SignOnResponseDTO from "../dto/response/SignOnResponseDTO";
import SignupResponseDTO from "../dto/response/SignupResponseDTO";
import UserEntity from "../entity/UserEntity";
import UserRepository from "../repository/UserRepository";
import AuthService from "../service/AuthService";
import BaseResource from "./BaseResource";

export class AuthResource extends BaseResource {
    private authService: AuthService;

    constructor(authService: AuthService) {
        super("users");
        this.authService = authService;
        this.registerUser = this.registerUser.bind(this);
        this.authenticateUser = this.authenticateUser.bind(this);
    }

    async registerUser(request: Request<any, any, BaseRequestDTO<SignupRequestDTO>>, response: Response): Promise<void> {
        try {
            const baseRequestDTO = await this.validateBaseResponseBody<SignupRequestDTO>(request.body);

            const signupRequestDTO = new SignupRequestDTO();
            signupRequestDTO._password = baseRequestDTO._data._attributes?.password;
            signupRequestDTO._email = baseRequestDTO._data._attributes?.email;

            //validate dto
            await this.validateDto<SignupRequestDTO>(signupRequestDTO);

            const user = await this.authService.registerUser(signupRequestDTO) as UserEntity;

            const responseDTO = new SignupResponseDTO();
            responseDTO._id = user._id;
            responseDTO._email = user._email;

            this.handleSuccess(request, response, responseDTO)
        } catch (error: any) {
            this.handleFailure(request, response, error);
        }
    }

    async authenticateUser(request: Request<any, any, BaseRequestDTO<SignonRequestDTO>>, response: Response): Promise<void> {
        try {
            const baseRequestDTO = await this.validateBaseResponseBody<SignonRequestDTO>(request.body);

            const requestDTO = new SignonRequestDTO();
            requestDTO._email = baseRequestDTO._data._attributes?.email;
            requestDTO._password = baseRequestDTO._data._attributes?.password;

            const result = await this.authService.authenticateUser(requestDTO);
            const responseDTO = new SignOnResponseDTO();
            responseDTO._id = result.user._id;
            responseDTO._email = result.user._email;
            responseDTO._doesUserProfileExist = !!result.user._profile;

            response.header("Authorization", "Bearer " + result.token);
            this.handleSuccess(request, response, responseDTO);
        } catch (e: any) {
            this.handleFailure(request, response, e);
        }
    }
}

const authResource = new AuthResource(new AuthService(new UserRepository()));

const authRouter = express.Router();
authRouter.post("/signup", authResource.registerUser);
authRouter.post("/signon", authResource.authenticateUser);

export default authRouter;