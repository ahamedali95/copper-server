export class ResponseData<T> {
    private type: string;
    private attributes: T;

    get _type(): string {
        return this.type;
    }

    set _type(value: string) {
        this.type = value;
    }

    get _attributes(): T {
        return this.attributes;
    }

    set _attributes(value: T) {
        this.attributes = value;
    }
}

class BaseResponse<T> {
    private data: ResponseData<T>;

    get _data(): ResponseData<T> {
        return this.data;
    }

    set _data(value: ResponseData<T>) {
        this.data = value;
    }
}

export default BaseResponse;