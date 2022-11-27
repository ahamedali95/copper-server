import {IsDefined} from "class-validator";

export class RequestData<T> {
    @IsDefined()
    private type: string;
    @IsDefined()
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

class BaseRequestDTO<T> {
    @IsDefined()
    private data: RequestData<T>;

    get _data(): RequestData<T> {
        return this.data;
    }

    set _data(value: RequestData<T>) {
        this.data = value;
    }
}

export default BaseRequestDTO;