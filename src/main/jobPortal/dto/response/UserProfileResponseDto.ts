import UserProfileDTO from "../UserProfileDTO";

class UserProfileResponseDTO extends UserProfileDTO {
    private id: number;

    get _id(): number {
        return this.id;
    }

    set _id(value: number) {
        this.id = value;
    }
}

export default UserProfileResponseDTO;