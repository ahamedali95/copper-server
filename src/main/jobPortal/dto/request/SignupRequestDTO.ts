import {IsDefined, IsEmail, IsString, Matches, MaxLength, MinLength} from "class-validator";

class SignupRequestDTO {
    @IsEmail()
    private email: string;

    @MinLength(12)
    @MaxLength(24)
    @Matches(new RegExp(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])/), { message: 'password must contain at least 1 upper case letter and 1 lower case letter and 1 number and 1 special character of the following: !@#$%^&*' })
    private password: string;

    get _email(): string {
        return this.email;
    }

    set _email(value: string) {
        this.email = value;
    }

    get _password(): string {
        return this.password;
    }

    set _password(value: string) {
        this.password = value;
    }
}

export default SignupRequestDTO;