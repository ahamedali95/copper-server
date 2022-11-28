import { ErrorNotification } from "../util/ErrorNotification";
import { IError } from "./types";

class IllegalArgumentException extends Error implements IError {
    errorNotification: ErrorNotification | undefined;

    constructor(message: string, errorNotification: ErrorNotification | undefined = undefined) {
        super(message);
        this.errorNotification = errorNotification;
    }
}

export default IllegalArgumentException;