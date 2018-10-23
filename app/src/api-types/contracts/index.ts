export interface IErrorResponse {
    error: string;
}

export interface IValidationErrorResponse {
    [path: string]: string;
}
