import { Item } from './global';

export type PriceListsState = {
  lists: PriceList[]
  onCreateLevel: OnCreateLevel
};

export enum OnCreateLevel { initial, success, failure }

export type PriceListEntry = {
  item: Item,
  quantity: number
};

export type PriceList = {
  id: number
  name: string
  entries: PriceListEntry[]
};

export const defaultPriceListsState: PriceListsState = {
  lists: [],
  onCreateLevel: OnCreateLevel.initial
};