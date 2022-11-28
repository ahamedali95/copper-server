import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import logger from "../config/logger";
import SignonRequestDTO from "../dto/request/SignOnRequestDTO";
import SignupRequestDTO from "../dto/request/SignupRequestDTO";
import UserEntity from "../entity/UserEntity";
import AuthencationException from "../exception/AuthencationException";
import type { IUserRepository } from "../repository/UserRepository";

class AuthService {
    private userRepository: IUserRepository;
    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async registerUser(requestDto: SignupRequestDTO): Promise<UserEntity[] | UserEntity> {
        const doesUserExist: UserEntity | undefined = await this.userRepository.findByEmail(requestDto._email);

        if (doesUserExist) {
            logger.info("User exists already");
            throw new AuthencationException("User already exits");
        } else {
            logger.info("User does not exist. Creating new account.");
            const hashedPassword = await bcrypt.hash(requestDto._password, 10);
            const user = new UserEntity();
            user._email = requestDto._email;
            user._password = hashedPassword;

            return await this.userRepository.save(user);
        }
    }

    async authenticateUser(requestDto: SignonRequestDTO): Promise<{
        token: string;
        user: UserEntity;
    }> {
        const user: UserEntity | undefined = await this.userRepository.findByEmail(requestDto._email);

        if (user) {
            const isUserAuthenticated = await bcrypt.compare(requestDto._password, user._password);

            if (isUserAuthenticated) {
                logger.info("User is authenticated");
                return {
                    token: jwt.sign({ email: requestDto._email }, "privateKey"),
                    user
                };
            } else {
                logger.info("User is not authenticated");
                throw new AuthencationException("Username or password is incorrect");
            }
        } else {
            logger.info("User is not found");
            throw new AuthencationException("User not found");
        }
    }
}

export default AuthService;