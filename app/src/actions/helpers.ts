interface IAction<T extends string> {
    type: T;
}

interface IActionWithPayload<T extends string, P> extends IAction<T> {
    payload: P;
}

export function createAction<T extends string>(type: T): IAction<T>;
export function createAction<T extends string, P>(type: T, payload: P): IActionWithPayload<T, P>;
export function createAction<T extends string, P>(type: T, payload?: P) {
    return payload === undefined ? { type } : { type, payload };
}

// tslint:disable-next-line:no-any
type FunctionType = (...args: any[]) => any;
interface IActionCreatorsMapObject {
    [actionCreator: string]: FunctionType;
}
export type ActionsUnion<A extends IActionCreatorsMapObject> = ReturnType<A[keyof A]>;

export const sleep = (duration: number): Promise<void> => new Promise<void>(resolve => setTimeout(resolve, duration));
