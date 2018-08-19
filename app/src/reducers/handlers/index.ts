import { run as pricelistsRunner } from "./price-lists";

export interface IKindHandlers<T, A> {
    [key: string]: IVerbHandlers<T, A>;
}

export interface IVerbHandlers<T, A> {
    [key: string]: ITaskHandlers<T, A>;
}

export interface ITaskHandlers<T, A> {
    [key: string]: (state: T, action: A) => T;
}

export type Runner<T, A> = (x: T, y: A) => T;

export const runners = {
    pricelist: pricelistsRunner,
};
