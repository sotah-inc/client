import { Item, Region, Realm } from './global';

export type PriceListsState = {
  lists: PriceList[]
  listCreateLevel: ListCreateLevel
  entryCreateLevel: EntryCreateLevel
  selectedList: PriceList | null
};

export enum EntryCreateLevel { initial, success, failure }

export type PriceListEntry = {
  item: Item
  quantity: number
};

export type PriceListOptions = {
  name: string
  region: Region
  realm: Realm
};

export enum ListCreateLevel { initial, success, failure }

export type PriceList = {
  id: number
  name: string
  entries: PriceListEntry[]
  region: Region
  realm: Realm
};

export const defaultPriceListsState: PriceListsState = {
  lists: [],
  listCreateLevel: ListCreateLevel.initial,
  entryCreateLevel: EntryCreateLevel.initial,
  selectedList: null
};