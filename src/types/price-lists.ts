import { RegionName, RealmSlug, ItemId, Errors } from './global';

export type PriceListsState = {
  pricelists: Pricelist[]
  createPricelistLevel: CreatePricelistLevel
  entryCreateLevel: EntryCreateLevel
  createPricelistErrors: Errors
  selectedList: Pricelist | null
  isAddListDialogOpen: boolean
  isAddEntryDialogOpen: boolean,
  getPricelistsLevel: GetPricelistsLevel
};

export enum CreateListStep { list, entry, finish }
export enum CreateListCompletion { initial, list, entry }
export enum EntryCreateLevel { initial, success, failure }
export enum CreatePricelistLevel { initial, fetching, success, failure }
export enum GetPriceListLevel { initial, success, failure }
export enum GetPricelistsLevel { initial, fetching, success, failure }

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
  pricelists: [],
  createPricelistLevel: CreatePricelistLevel.initial,
  entryCreateLevel: EntryCreateLevel.initial,
  createPricelistErrors: {},
  selectedList: null,
  isAddListDialogOpen: false,
  isAddEntryDialogOpen: false,
  getPricelistsLevel: GetPricelistsLevel.initial
};
