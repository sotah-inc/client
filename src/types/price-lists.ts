import { RegionName, RealmSlug, ItemId } from './global';

export type PriceListsState = {
  lists: Pricelist[]
  listCreateLevel: ListCreateLevel
  entryCreateLevel: EntryCreateLevel
  selectedList: Pricelist | null
  isAddListDialogOpen: boolean
  isAddEntryDialogOpen: boolean
};

export enum CreateListStep { list, entry, finish }

export enum CreateListCompletion { initial, list, entry }

export enum EntryCreateLevel { initial, success, failure }

export enum ListCreateLevel { initial, success, failure }

export enum GetPriceListLevel { initial, success, failure }

export type Pricelist = {
  id: number
  user_id: number
  name: string
  region: RegionName
  realm: RealmSlug
  pricelist_entries?: PricelistEntry[]
};

export type PricelistEntry = {
  id?: number
  pricelist_id?: number
  item_id: ItemId
  quantity_modifier: number
};

export const defaultPriceListsState: PriceListsState = {
  lists: [],
  listCreateLevel: ListCreateLevel.initial,
  entryCreateLevel: EntryCreateLevel.initial,
  selectedList: null,
  isAddListDialogOpen: false,
  isAddEntryDialogOpen: false
};
