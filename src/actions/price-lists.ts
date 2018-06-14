import { createAction, ActionsUnion } from './helpers';

export const REQUEST_PING = 'REQUEST_PING';
const RequestPing = () => createAction(REQUEST_PING);

export const PriceListsActions = {
  RequestPing
};

export type PriceListsActions = ActionsUnion<typeof PriceListsActions>;
