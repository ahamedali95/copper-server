declare namespace Express {
    interface User {
        userId: string;
    }

    export interface Request {
        id: string;
        user: User
    }
}