import { IsDefined, IsEmail, IsString } from "class-validator";

class SignonRequestDTO {
    @IsEmail()
    private email: string;

    @IsDefined()
    @IsString()
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

export default SignonRequestDTO;