import { getDbConnection } from "../config/database";
import UserEntity from "../entity/UserEntity";
import { CrudRepository } from "../types";
import BaseRepository from "./BaseRepository";

export interface IUserRepository extends CrudRepository<UserEntity> {
    findByEmail(email: string): Promise<UserEntity | undefined>;
}

class UserRepository extends BaseRepository<UserEntity> implements IUserRepository {
    public constructor() {
        super(UserEntity, getDbConnection());
    }

    async findByEmail(email: string): Promise<UserEntity> {
        return await this.repositoryManager.findOne({
            where: {
                email
            }
        });
    }
}

export default UserRepository;