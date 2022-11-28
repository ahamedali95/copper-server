import express, {Request, Response} from 'express';
import UserRepository, {UserProfileRepository} from "../repository/UserRepository";
import BaseRequestDTO from "../dto/request/BaseRequestDTO";
import BaseResource from "./BaseResource";

import logger from "../config/logger";
import UserService from "../service/UserService";
import UserProfileRequestDTO from "../dto/request/UserProfileRequestDTO";
import UserProfileResponseDTO from "../dto/response/UserProfileResponseDto";
import UserDetailResponseDto from "../dto/response/UserDetailResponseDto";
import UserProfile from "../entity/UserProfileEntity";
import UserDetailRequestDto from "../dto/request/UserDetailRequestDto";

export class UserResource extends BaseResource {
    private userService: UserService;

    constructor(userService: UserService) {
        super("user");
        this.userService = userService;
        this.createOrUpdateProfile = this.createOrUpdateProfile.bind(this);
        this.getProfile = this.getProfile.bind(this);
        this.deleteProfile = this.deleteProfile.bind(this);
        this.updateEmail = this.updateEmail.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    async createOrUpdateProfile(request: Request<{}, {}, BaseRequestDTO<UserProfileRequestDTO>>, response: Response): Promise<void> {
        try {
            logger.info(`Request body: ${JSON.stringify(request.body)}`);
            const baseRequestDTO = await this.validateBaseResponseBody<UserProfileRequestDTO>(request.body);
            const userProfileRequestDTO = this.getUserProfileRequestDto(baseRequestDTO);
            await this.validateDto(userProfileRequestDTO);
            const userProfile = await this.userService.createOrUpdateUserProfile(userProfileRequestDTO);

            this.handleSuccess(request, response, this.mapUserProfileEntityToResponseDto(userProfile));
        } catch (error: any) {
            this.handleFailure(request, response, error);
        }
    }

    async getProfile(request: Request<{}, {}, {}>, response: Response): Promise<void> {
        try {
            const profile = await this.userService.getUserProfile();
            this.handleSuccess(request, response, profile);
        } catch (e: any) {
            this.handleFailure(request, response, e);
        }
    }

    async deleteProfile(request: Request<{}, {}, {}>, response: Response): Promise<void> {
        try {
            await this.userService.deleteUserProfile();

            this.handleSuccess(request, response, {});
        } catch (e: any) {
            console.log("fail", e)

            this.handleFailure(request, response, e);
        }
    }


    async updateEmail(request: Request<{}, {}, BaseRequestDTO<UserDetailRequestDto>>, response: Response): Promise<void> {
        try {
            logger.info(`Request body: ${JSON.stringify(request.body)}`);
            const baseRequestDTO = await this.validateBaseResponseBody<UserDetailRequestDto>(request.body);
            const userDetailRequestDto = new UserDetailRequestDto();
            userDetailRequestDto._email = baseRequestDTO?._data._attributes?.email;
            await this.validateDto(userDetailRequestDto);
            const user = await this.userService.updateUserEmail(userDetailRequestDto);
            const userDetailResponseDto = new UserDetailResponseDto();
            userDetailResponseDto._email = user._email;

            this.handleSuccess(request, response, userDetailResponseDto);
        } catch (error: any) {
            this.handleFailure(request, response, error);
        }
    }


    async deleteUser(request: Request<{}, {}, {}>, response: Response): Promise<void> {
        try {
            await this.userService.deleteUser();

            this.handleSuccess(request, response, {});
        } catch (error: any) {
            this.handleFailure(request, response, error);
        }

    }

    private getUserProfileRequestDto(baseRequestDTO: any): UserProfileRequestDTO {
        const userProfileRequestDTO = new UserProfileRequestDTO();

        userProfileRequestDTO._firstName = baseRequestDTO._data._attributes?.firstName;
        userProfileRequestDTO._lastName = baseRequestDTO._data._attributes?.lastName;
        userProfileRequestDTO._occupation = baseRequestDTO._data._attributes?.occupation;
        userProfileRequestDTO._company = baseRequestDTO._data._attributes?.company;
        userProfileRequestDTO._experience = baseRequestDTO._data._attributes?.experience;
        userProfileRequestDTO._twitterUrl = baseRequestDTO._data._attributes?.twitterUrl;
        userProfileRequestDTO._githubUrl = baseRequestDTO._data._attributes?.githubUrl;
        userProfileRequestDTO._linkedInUrl = baseRequestDTO._data._attributes?.linkedInUrl;
        userProfileRequestDTO._dob = baseRequestDTO._data._attributes?.dob;
        userProfileRequestDTO._phoneNumber = baseRequestDTO._data._attributes?.phoneNumber;
        userProfileRequestDTO._city = baseRequestDTO._data._attributes?.city;
        userProfileRequestDTO._state = baseRequestDTO._data._attributes?.state;
        userProfileRequestDTO ._country = baseRequestDTO._data._attributes?.country;
        userProfileRequestDTO._postalCode = baseRequestDTO._data._attributes?.postalCode;
        userProfileRequestDTO ._shortBio = baseRequestDTO._data._attributes?.shortBio;

        return userProfileRequestDTO;
    }


    private mapUserProfileEntityToResponseDto(userProfile: UserProfile) {
        const userProfileResponseDTO = new UserProfileResponseDTO();

        userProfileResponseDTO._id = userProfile._id;
        userProfileResponseDTO._firstName = userProfile._firstName;
        userProfileResponseDTO._lastName = userProfile._lastName;
        userProfileResponseDTO._occupation = userProfile._occupation;
        userProfileResponseDTO._company = userProfile._company;
        userProfileResponseDTO._experience = userProfile._experience;
        userProfileResponseDTO._twitterUrl = userProfile._twitterUrl;
        userProfileResponseDTO._githubUrl = userProfile._githubUrl;
        userProfileResponseDTO._linkedInUrl = userProfile._linkedInUrl;
        userProfileResponseDTO._dob = userProfile._dob;
        userProfileResponseDTO._phoneNumber = userProfile._phoneNumber;
        userProfileResponseDTO._city = userProfile._city;
        userProfileResponseDTO._state = userProfile._state;
        userProfileResponseDTO._country = userProfile._country;
        userProfileResponseDTO._postalCode = userProfile._postalCode;
        userProfileResponseDTO._shortBio = userProfile._shortBio;

        return userProfileResponseDTO;
    }
}

const userResource = new UserResource(new UserService(new UserRepository(), new UserProfileRepository()));

const userRouter = express.Router();
userRouter.post('/profile', userResource.createOrUpdateProfile);
userRouter.get('/profile', userResource.getProfile);
userRouter.put('/profile', userResource.createOrUpdateProfile);
userRouter.delete('/profile', userResource.deleteProfile);
userRouter.put('/accountDetails', userResource.updateEmail);
userRouter.delete('/accountDetails', userResource.deleteUser);

export default userRouter;