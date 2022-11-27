import {ValidationError} from "class-validator";

export class Error {
    private field: string;
    private message: string;
    private error: Error | undefined;

    constructor(field: string, message: string, e: Error | undefined) {
        this.field = field;
        this.message = message;
        this.error = e;
    }

    get _field(): string {
        return this.field;
    }

    get _message(): string {
        return this.message;
    }

    get _error(): Error | undefined {
        return this.error;
    }
}

export class ErrorNotification {
    private errors: Error[];

    constructor() {
        this.errors = [];
    }

    get _errors(): Error[] {
        return this.errors;
    }

    addError(field: string, message: string, e: Error | undefined = undefined) {
        this.errors.push(new Error(field, message, e));
    }
}

export const populateErrorNotification = (errorNotification: ErrorNotification, errors: ValidationError[]): ErrorNotification => {
    errors.forEach((e: ValidationError) => {
        if (e.constraints) {
            Object.keys(e.constraints).forEach((k: string) => {
                errorNotification.addError(e.property, e.constraints![k]);
            });
        }
    });

    return errorNotification;
};