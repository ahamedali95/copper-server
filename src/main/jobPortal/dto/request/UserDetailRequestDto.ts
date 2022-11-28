import { IsEmail } from "class-validator";

//@todo: expand it to allow update user password
class UserDetailRequestDto {
    @IsEmail()
    private email: string;

    get _email(): string {
        return this.email;
    }

    set _email(value: string) {
        this.email = value;
    }
}

export default UserDetailRequestDto;