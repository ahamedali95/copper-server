import type {IUserRepository, UserProfileRepository} from "../repository/UserRepository";
import User from "../entity/UserEntity";
import AuthencationException from "../exception/AuthencationException";
import logger from "../config/logger";
import UserProfileRequestDTO from "../dto/request/UserProfileRequestDTO";
import httpContext from 'express-http-context';
import UserProfile from "../entity/UserProfileEntity";
import ResourceNotException from "../exception/ResourceNotFoundException";
import ResourceNotFoundException from "../exception/ResourceNotFoundException";
import UserDetailRequestDto from "../dto/request/UserDetailRequestDto";

class UserService {
    private userRepository: IUserRepository;
    private userProfileRepository: UserProfileRepository;

    constructor(userRepository: IUserRepository, userProfileRepository: UserProfileRepository) {
        this.userRepository = userRepository;
        this.userProfileRepository = userProfileRepository;
    }

    async createOrUpdateUserProfile(userProfileRequestDTO: UserProfileRequestDTO): Promise<UserProfile> {
        const user = await this.userRepository.findByEmail(httpContext.get("user").userId) as User;
        const userProfile = user?._profile;

        if (userProfile) {
            logger.info("User already has a profile. Proceeding to update.");
            return await this.userProfileRepository.save(this.mapUserProfileDtoToEntity(userProfile, userProfileRequestDTO)) as UserProfile;
        }

        logger.info("User does not have a profile. Proceeding to create.");
        user._profile = this.mapUserProfileDtoToEntity(new UserProfile(), userProfileRequestDTO);
        await this.userRepository.save(user);

        return user._profile;
    }

    async getUserProfile(): Promise<UserProfile> {
        const user = await this.userRepository.findByEmail(httpContext.get("user").userId) as User;
        const userProfile = user?._profile as UserProfile;

        if (userProfile) {
            logger.info("User already has a profile.");
            return userProfile;
        }

        logger.info("User does not have a profile.");
        throw new ResourceNotFoundException("Profile not found");
    }


    async deleteUserProfile(): Promise<boolean> {
        const user = await this.userRepository.findByEmail(httpContext.get("user").userId) as User;
        const userProfile = user?._profile;

        if (userProfile) {
            logger.info("User already has a profile. Proceeding to delete.");
            const profile = await this.userProfileRepository.findOne(userProfile._id) as UserProfile;
            profile._user = {} as User;
            //remove foreign key constraint from user table before deleting profile.
            user._profile = null;
            await this.userRepository.save(user);
            return await this.userProfileRepository.delete(profile);
        }

        logger.info("User does not have a profile.");
        throw new ResourceNotFoundException("Profile not found");
    }

    async updateUserEmail(userDetail: UserDetailRequestDto): Promise<User> {
        const user = await this.userRepository.findByEmail(httpContext.get("user").userId) as User;
        user._email = userDetail._email;

        return await this.userRepository.update(user) as User;
    }

    async deleteUser(): Promise<boolean> {
        const user = await this.userRepository.findByEmail(httpContext.get("user").userId) as User;
        return await this.userRepository.delete(user);
    }

    private mapUserProfileDtoToEntity(profile: UserProfile, userProfileDTO: UserProfileRequestDTO): UserProfile {
        profile._firstName = userProfileDTO._firstName;
        profile._lastName = userProfileDTO._lastName;
        profile._occupation = userProfileDTO._occupation;
        profile._company = userProfileDTO._company;
        profile._experience = userProfileDTO._experience;
        profile._twitterUrl = userProfileDTO._twitterUrl;
        profile._githubUrl = userProfileDTO._githubUrl;
        profile._linkedInUrl = userProfileDTO._linkedInUrl;
        profile._dob = userProfileDTO._dob;
        profile._phoneNumber = userProfileDTO._phoneNumber;
        profile._city = userProfileDTO._city;
        profile._state = userProfileDTO._state;
        profile._country = userProfileDTO._country;
        profile._postalCode = userProfileDTO._postalCode;
        profile._shortBio = userProfileDTO._shortBio;

        return profile;
    }
}

export default UserService;