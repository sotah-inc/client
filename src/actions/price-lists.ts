import { createAction, ActionsUnion } from './helpers';

export const CREATE_PRICELIST = 'CREATE_PRICELIST';
export const CreatePricelist = (payload: string) => createAction(CREATE_PRICELIST, payload);

export const PriceListsActions = {
  CreatePricelist
};

export type PriceListsActions = ActionsUnion<typeof PriceListsActions>;
