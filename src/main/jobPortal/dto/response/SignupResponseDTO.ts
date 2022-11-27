import {IsDefined, IsEmail, IsString, Matches, MaxLength, MinLength} from "class-validator";

class SignupResponseDTO {
    private id: number;
    private email: string;

    get _id(): number {
        return this.id;
    }

    set _id(value: number) {
        this.id = value;
    }

    get _email(): string {
        return this.email;
    }

    set _email(value: string) {
        this.email = value;
    }
}

export default SignupResponseDTO;