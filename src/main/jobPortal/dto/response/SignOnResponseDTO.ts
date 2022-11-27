import SignupResponseDTO from "./SignupResponseDTO";

class SignOnResponseDTO extends SignupResponseDTO {
    private doesUserProfileExist: boolean;

    get _doesUserProfileExist(): boolean {
        return this.doesUserProfileExist;
    }

    set _doesUserProfileExist(value: boolean) {
        this.doesUserProfileExist = value;
    }
}


export default SignOnResponseDTO;