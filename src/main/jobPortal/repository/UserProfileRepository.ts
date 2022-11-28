import { getDbConnection } from "../config/database";
import UserProfileEntity from "../entity/UserProfileEntity";
import BaseRepository from "./BaseRepository";

class UserProfileRepository extends BaseRepository<UserProfileEntity> {
    public constructor() {
        super(UserProfileEntity, getDbConnection());
    }
}

export default UserProfileRepository;