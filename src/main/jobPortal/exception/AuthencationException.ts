import { ErrorNotification } from "../util/ErrorNotification";

interface IError extends Error {
    errorNotification: ErrorNotification | undefined
}

class AuthencationException extends Error implements IError {
    errorNotification: ErrorNotification | undefined;

    constructor(message: string, errorNotification: ErrorNotification | undefined = undefined) {
        super(message);
        this.errorNotification = errorNotification;
    }
}

export default AuthencationException;