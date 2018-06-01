import * as HTTPStatus from 'http-status';

import { apiEndpoint } from './index';
import { Auction, Region, Realm, Owner, Item, OwnerName, ItemId, ItemClass } from '../types/global';
import { SortDirection, SortKind, QueryAuctionResult } from '../types/auction';

export const getPing = async (): Promise<boolean> => {
  try {
    await fetch(`${apiEndpoint}/ping`);
    return true;
  } catch (err) {
    return false;
  }
};

export const getRegions = async (): Promise<Region[]> => {
  return await (await fetch(`${apiEndpoint}/regions`)).json();
};

export const getStatus = async (regionName: string): Promise<Realm[] | null> => {
  const res = await fetch(`${apiEndpoint}/region/${regionName}/realms`);
  if (res.status !== HTTPStatus.OK) {
    return null;
  }

  return (await res.json()).realms;
};

export type GetAuctionsOptions = {
  regionName: string
  realmSlug: string
  page: number
  count: number
  sortDirection: SortDirection
  sortKind: SortKind
  ownerFilters: OwnerName[]
  itemFilters: ItemId[]
};

export type AuctionsResponse = {
  auctions: Auction[] | null
  total: number
};

export const getAuctions = async (opts: GetAuctionsOptions): Promise<AuctionsResponse | null> => {
  const { regionName, realmSlug, page, count, sortDirection, sortKind, ownerFilters, itemFilters } = opts;
  const res = await fetch(`${apiEndpoint}/region/${regionName}/realm/${realmSlug}/auctions`, {
    method: 'POST',
    body: JSON.stringify({ page, count, sortDirection, sortKind, ownerFilters, itemFilters }),
    headers: new Headers({ 'content-type': 'application/json' })
  });
  if (res.status !== HTTPStatus.OK) {
    return null;
  }

  return await res.json();
};

export type GetOwnersOptions = {
  regionName: string
  realmSlug: string
  query: string
};

export type OwnersResponse = {
  owners: Owner[]
};

export const getOwners = async (opts: GetOwnersOptions): Promise<OwnersResponse | null> => {
  const { regionName, realmSlug, query } = opts;
  const res = await fetch(`${apiEndpoint}/region/${regionName}/realm/${realmSlug}/owners`, {
    method: 'POST',
    body: JSON.stringify({ query }),
    headers: new Headers({ 'content-type': 'application/json' })
  });
  if (res.status !== HTTPStatus.OK) {
    return null;
  }

  return await res.json();
};

export type ItemsResponse = {
  items: Item[]
};

export const getItems = async (query: string): Promise<ItemsResponse | null> => {
  const res = await fetch(`${apiEndpoint}/items`, {
    method: 'POST',
    body: JSON.stringify({ query }),
    headers: new Headers({ 'content-type': 'application/json' })
  });
  if (res.status !== HTTPStatus.OK) {
    return null;
  }

  return await res.json();
};

export type QueryAuctionsOptions = {
  regionName: string
  realmSlug: string
  query: string
};

export type AuctionsQueryItems = QueryAuctionResult[];

export type AuctionsQueryResponse = {
  items: AuctionsQueryItems
};

export const queryAuctions = async (opts: QueryAuctionsOptions): Promise<AuctionsQueryResponse | null> => {
  const { regionName, realmSlug, query } = opts;
  const res = await fetch(`${apiEndpoint}/region/${regionName}/realm/${realmSlug}/query-auctions`, {
    method: 'POST',
    body: JSON.stringify({ query }),
    headers: new Headers({ 'content-type': 'application/json' })
  });
  if (res.status !== HTTPStatus.OK) {
    return null;
  }

  return await res.json();
};

export type GetItemClassesResponse = {
  classes: ItemClass[]
};

export const getItemClasses = async (): Promise<GetItemClassesResponse | null> => {
  return await (await fetch(`${apiEndpoint}/item-classes`)).json();
};