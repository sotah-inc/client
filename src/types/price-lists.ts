import { Item } from './global';

export type PriceListEntry = {
  item: Item,
  quantity: number
};

export type PriceList = {
  id: number
  name: string
  entries: PriceListEntry[]
};

export type PriceListsState = {
  lists: PriceList[]
};

export const defaultPriceListsState: PriceListsState = {
  lists: []
};