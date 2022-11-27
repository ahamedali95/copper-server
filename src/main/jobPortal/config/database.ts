import { getConnectionManager, ConnectionManager, Connection } from "typeorm";
import UserEntity from "../entity/UserEntity";
import UserProfileEntity from "../entity/UserProfileEntity";

const connectionManager = getConnectionManager();

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
    synchronize: true,
    logging: false

});

let db: Connection;

const getDbConnection = (): Connection => db;

const initDbConnection = async () => {
    try {
        db = await connection.connect();
        console.log("Data Source has been initialized!");
    } catch(err: any) {
        console.error("Error during Data Source initialization", err)
    }
};

export {
    initDbConnection,
    getDbConnection
};