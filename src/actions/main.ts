import { Dispatch } from 'redux';

import { createAction, ActionsUnion } from './helpers';
import { Profile } from '../types/global';
import { getPing } from '../api/data';

export const REQUEST_PING = 'REQUEST_PING';
export const RECEIVE_PING = 'RECEIVE_PING';
const RequestPing = () => createAction(REQUEST_PING);
const ReceivePing = (payload: boolean) => createAction(RECEIVE_PING, payload);
type FetchPingType = ReturnType<typeof RequestPing | typeof ReceivePing>;
export const FetchPing = () => {
  return async (dispatch: Dispatch<FetchPingType>) => {
    dispatch(RequestPing());
    dispatch(ReceivePing(await getPing()));
  };
};

export const USER_REGISTER = 'USER_REGISTER';
export const UserRegister = (payload: Profile) => createAction(USER_REGISTER, payload);

export const USER_LOGIN = 'USER_LOGIN';
export const UserLogin = (payload: Profile) => createAction(USER_LOGIN, payload);

export const MainActions = {
  RequestPing, ReceivePing,
  UserRegister, UserLogin
};

export type MainActions = ActionsUnion<typeof MainActions>;
