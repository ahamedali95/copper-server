export class Source {
    private pointer: string | null;
    private parameter: string | null;

    get _pointer(): string | null {
        return this.pointer;
    }

    set _pointer(value: string | null) {
        this.pointer = value;
    }

    get _parameter(): string | null {
        return this.parameter;
    }

    set _parameter(value: string | null) {
        this.parameter = value;
    }
}


export class ErrorDetail {
    private title: string;
    private detail: string;
    private source: Source | null;

    get _title(): string {
        return this.title;
    }

    set _title(value: string) {
        this.title = value;
    }

    get _detail(): string {
        return this.detail;
    }

    set _detail(value: string) {
        this.detail = value;
    }

    get _source(): Source | null {
        return this.source;
    }

    set _source(value: Source | null) {
        this.source = value;
    }
}

export class BaseErrorResponse {
    private errors: ErrorDetail[];

    constructor() {
        this.errors = []
    }

    get _errors(): ErrorDetail[] {
        return this.errors;
    }

    addError(value: ErrorDetail) {
        this.errors.push(value);
    }
}