import { Connection, getConnectionManager } from "typeorm";

import UserEntity from "../entity/UserEntity";
import UserProfileEntity from "../entity/UserProfileEntity";
import logger from "./logger";

const connectionManager = getConnectionManager();

//@todo - sharing this to trusted party in this case. Move db credentials to db vault or secret manager in the future.
//@todo - Moreover, do profile management to handle config for each environment.
const connection = connectionManager.create({
    type: "postgres",
    host: "jelani.db.elephantsql.com",
    port: 5432,
    username: "afiiroky",
    password: "IPdLOqRBwl2DTr-LMN8tMbn7fmT2xTix",
    database: "afiiroky",
    entities: [
        "../entity/*.ts",
        UserEntity,
        UserProfileEntity
    ],
    //@todo - turn this rule off and implement database migration which allows for better tracking of schema changes.
    synchronize: true,
    logging: true
});

let db: Connection;

const getDbConnection = (): Connection => db;

const initDbConnection = async () => {
    try {
        db = await connection.connect();
        logger.info("Data Source has been initialized!");
    } catch(err: any) {
        logger.error("Error during Data Source initialization", err)
    }
};

export {
    getDbConnection,
    initDbConnection
};