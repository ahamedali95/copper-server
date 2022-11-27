import {Request, Response} from "express";
import BaseRequestDTO, {RequestData} from "../dto/request/BaseRequestDTO";
import {validate, ValidationError} from "class-validator";
import IllegalArgumentException from "../exception/IllegalArgumentException";
import AuthencationException from "../exception/AuthencationException";
import {

    StatusCodes,

} from 'http-status-codes';
import BaseResponse, {ResponseData} from "../dto/response/BaseResponse";
import {BaseErrorResponse, ErrorDetail, Source} from "../dto/response/BaseErrorResponse";
import {ErrorNotification, Error, populateErrorNotification} from "../util/ErrorNotification";
import {IError} from "../exception/types";
import logger from "../config/logger";
import ResourceNotFoundException from "../exception/ResourceNotFoundException";


abstract class BaseResource {
    protected type: string;

    protected constructor(type: string) {
        this.type = type;
    }

    async validateBaseResponseBody<T>(requestBody: BaseRequestDTO<T>): Promise<BaseRequestDTO<any>> {
        const baseRequestDto = new BaseRequestDTO();
        const requestData = new RequestData();

        //@ts-ignore
        baseRequestDto._data = requestBody?.data;
        //@ts-ignore
        requestData._attributes = requestBody?.data?.attributes;
        //@ts-ignore
        requestData._type = requestBody?.data?.type;

        const baseRequestDtoErrors: ValidationError[] = await validate(baseRequestDto);
        const requestDataErrors: ValidationError[] = await validate(requestData);

        let errorNotification = new ErrorNotification();
        errorNotification = populateErrorNotification(errorNotification, baseRequestDtoErrors);
        errorNotification = populateErrorNotification(errorNotification, requestDataErrors);

        if (errorNotification._errors.length) throw new IllegalArgumentException("Invalid input parameters", errorNotification);

        baseRequestDto._data = requestData;
        return baseRequestDto;
    }

    async validateDto<T extends object>(dto: T): Promise<void> {
        const errors = await validate(dto);
        console.log(dto)
        console.log(errors)

        if (errors.length) {
            const errorNotification = populateErrorNotification(new ErrorNotification(), errors);
            logger.info(`Error notifications length: ${errorNotification._errors.length}`);
            throw new IllegalArgumentException("Invalid input parameters", errorNotification);
        }
    }


    handleSuccess(req: Request, res: Response, dto: any): void {
        if (req.method === "POST") {
            this.handlePostSuccess(res, dto);
        } else if (req.method === "GET") {
            this.handleStandard(res, dto);
        } else if (req.method === "DELETE") {
            this.handleStandard(res, dto);
        } else if (req.method === "UPDATE") {
            this.handleStandard(res, dto);
        }
    }

    handleFailure(req: Request, res: Response, e: IError): void {
        if (e instanceof AuthencationException) {
            this.handleUnprocessableEntity(res, e);
        } else if (e instanceof IllegalArgumentException) {
            this.handleBadRequest(res, e);
        } else if (e instanceof ResourceNotFoundException) {
            this.handleNotFound(res, e);
        } else {
            this.internalServerError(res, e)
        }
    }


    private handleStandard(res: Response, dto: any): void {
        res.status(StatusCodes.OK).json(this.generateBaseResponse(dto)).send();
    }

    private handlePostSuccess(res: Response, dto: any): void {
        res.status(StatusCodes.CREATED).json(this.generateBaseResponse(dto)).send();
    }

    private handleUnprocessableEntity(res: Response, e: IError): void {
        res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(this.generateBaseErrorResponse(res, e)).send();
    }

    private handleBadRequest(res: Response, e: IError): void {
        res.status(StatusCodes.BAD_REQUEST).json(this.generateBaseErrorResponse(res, e)).send();
    }

    private internalServerError(res: Response, e: IError): void {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(this.generateBaseErrorResponse(res, e)).send();
    }

    private handleNotFound(res: Response, e: IError): void {
        res.status(StatusCodes.NOT_FOUND).json(this.generateBaseErrorResponse(res, e)).send();
    }

    private generateBaseResponse(dto: any): BaseResponse<any> {
        const baseResponse = new BaseResponse();
        const responseData = new ResponseData();

        responseData._attributes = dto;
        responseData._type = this.type;
        baseResponse._data = responseData;

        return baseResponse;
    }

    private generateBaseErrorResponse(res: Response, e: IError): BaseErrorResponse {
        const baseErrorResponse = new BaseErrorResponse();

        if(e?.errorNotification) {
            e.errorNotification._errors.forEach((error: Error): void => {
                const errorDetail = new ErrorDetail();
                const source = new Source();

                source._pointer = `data/attributes/${error._field}`;
                source._parameter = error._field;

                errorDetail._title = e.message;
                errorDetail._detail = error._message;
                errorDetail._source = source;

                baseErrorResponse.addError(errorDetail);
            });
        } else {
            const errorDetail = new ErrorDetail();
            errorDetail._title = e.message;

            baseErrorResponse.addError(errorDetail);
        }

        return baseErrorResponse;
    }
}

export default BaseResource;