import express, {Request, Response} from 'express';
import {getDbConnection} from "../config/database";
import UserRepository from "../repository/UserRepository";
import SignupRequestDTO from "../dto/request/SignupRequestDTO";
import AuthService from "../service/AuthService";
import BaseRequestDTO, {RequestData} from "../dto/request/BaseRequestDTO";
import { StrictBuilder, Builder } from 'builder-pattern';
import UserEntity from "../entity/UserEntity";
import {constants} from "http2";
import {

    StatusCodes,

} from 'http-status-codes';
import {validate} from "class-validator";
import IllegalArgumentException from "../exception/IllegalArgumentException";
import BaseResource from "./BaseResource";
import AuthencationException from "../exception/AuthencationException";
import SignupResponseDTO from "../dto/response/SignupResponseDTO";
import SignonRequestDTO from "../dto/request/SignOnRequestDTO";
import {inject} from "inversify";
import {myContainer} from "../config/iocContainer";
import logger from "../config/logger";
import {ErrorNotification, populateErrorNotification} from "../util/ErrorNotification";
import SignOnResponseDTO from "../dto/response/SignOnResponseDTO";


const AuthResource1 = express.Router();

AuthResource1.get('/signup', async (req: Request, res: Response) => {
    const user = new UserEntity();
    // user.email = "ahamed@usa.com";
    // user.password = "ddddss";
    console.log(user);
    // await new UserRepository().save(user);
    // const exists = await new UserRepository().exists(1);
    // console.log(exists);

    // const count = await new UserRepository().count();
    // console.log(count);
    //
    // const delete1 = await new UserRepository().delete({ email: 'ahamed@usa.com', password: 'dddssaa', id: 1});
    // console.log(delete1);
    //
    // const update = await new UserRepository().update({ id: 2, email: 'none', password: 'vvaadi number 2'});
    //
    // console.log(update)
    //
    // const findbyemail = await new UserRepository().findByEmail('none');
    // console.log(findbyemail)
    //
    // const findAll = await new UserRepository().findAll();
    // console.log(findAll)
    //
    // const findbyemail2 = await new UserRepository().findByEmail('weww');
    // console.log(findbyemail2)
    //
    // const findOne = await new UserRepository().findOne(100);
    // console.log(findOne)
    res.send("hello")
});

export { AuthResource1 };

export class AuthResource extends BaseResource {
    private authService: AuthService;

    constructor(authService: AuthService) {
        super("users");
        this.authService = authService;
        this.registerUser = this.registerUser.bind(this);
        this.authenticateUser = this.authenticateUser.bind(this);
    }

    async registerUser(request: Request<{}, {}, BaseRequestDTO<SignupRequestDTO>>, response: Response): Promise<void> {
        try {
            logger.info(`Request body: ${JSON.stringify(request.body)}`);
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

    async authenticateUser(request: Request<{}, {}, BaseRequestDTO<SignonRequestDTO>>, response: Response): Promise<void> {
        try {
            logger.info(`Request body: ${JSON.stringify(request.body)}`);
            const baseRequestDTO = await this.validateBaseResponseBody<SignonRequestDTO>(request.body);

            const requestDTO = new SignonRequestDTO();
            requestDTO._email = baseRequestDTO._data._attributes?.email;
            requestDTO._password = baseRequestDTO._data._attributes?.password;

            const result = await this.authService.authenticateUser(requestDTO);
            const responseDTO = new SignOnResponseDTO();
            responseDTO._id = result.user._id;
            responseDTO._email = result.user._email;
            responseDTO._doesUserProfileExist = !!result.user._profile;

            response.header('Authorization', 'Bearer ' + result.token);
            this.handleSuccess(request, response, responseDTO);
        } catch (e: any) {
           this.handleFailure(request, response, e);
        }
    }
}

const authResource = new AuthResource(new AuthService(new UserRepository()));

const authRouter = express.Router();
authRouter.post('/signup', authResource.registerUser);
authRouter.post('/signon', authResource.authenticateUser);

export default authRouter;