import UserEntity from "../entity/UserEntity";
import {CrudRepository} from "../types";
import {Repository, Connection, DeleteResult} from "typeorm";
import {getDbConnection} from "../config/database";
import UserProfileEntity from "../entity/UserProfileEntity";

export interface IUserRepository extends CrudRepository<UserEntity> {
    findByEmail(email: string): Promise<UserEntity | undefined>;
}


class BaseRepository<T> {
    protected dbConnection: Connection;
    protected repositoryManager: Repository<any>;
    protected repositoryType: 'rdbms' | 'nosql';

    public constructor(model: any, dbConnection: Connection, repositoryType: 'rdbms' | 'nosql' = 'rdbms') {
        this.dbConnection = dbConnection;
        this.repositoryType = repositoryType;
        this.repositoryManager = this.dbConnection.manager[this.repositoryType === 'rdbms' ? 'getRepository' : 'getMongoRepository'](model as any);
    }

    async save(entity: Omit<T, '_id'> | Omit<T, '_id'>[]): Promise<T | T[]> {
        return await this.repositoryManager.save(entity);
    }

    async findOne(id: string | number): Promise<T | undefined> {
        return await this.repositoryManager.findOne({
            where: {
                id
            }
        });
    }

    async findAll(): Promise<T[]> {
        return await this.repositoryManager.find();
    }

    async count(): Promise<number> {
        return await this.repositoryManager.count();
    }

    async delete(entity: T): Promise<boolean> {
        const result = await this.repositoryManager.delete(entity);

        return !!result.affected;
    }

    async exists(id: string | number): Promise<boolean> {
        return !!await this.findOne(id);
    }

    async update(entity: T | T[]): Promise<T | T[]> {
        return await this.repositoryManager.save(entity);
    }
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

export class UserProfileRepository extends BaseRepository<UserProfileEntity> {
    public constructor() {
        super(UserProfileEntity, getDbConnection());
    }
}



export default UserRepository;