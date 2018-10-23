import { IUserJson } from "../../types/entities";

export interface ICreateUserRequest {
    email: string;
    password: string;
}

export interface ICreateUserResponse {
    token: string;
    user: IUserJson;
}

export interface ILoginRequest {
    email: string;
    password: string;
}

export interface ILoginResponse {
    token: string;
}
