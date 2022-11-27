import { ErrorNotification } from "../util/ErrorNotification";

export interface IError extends Error {
    errorNotification: ErrorNotification | undefined
}