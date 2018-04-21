import * as HTTPStatus from 'http-status';

import { apiEndpoint } from './index';
import { Auction, Region, Realm } from '../types/global';
import { SortDirection, SortKind } from '../types/auction';

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
};

export type AuctionsResponse = {
  auctions: Auction[] | null
  total: number
};

export const getAuctions = async (opts: GetAuctionsOptions): Promise<AuctionsResponse | null> => {
  const { regionName, realmSlug, page, count, sortDirection, sortKind } = opts;
  const res = await fetch(`${apiEndpoint}/region/${regionName}/realm/${realmSlug}/auctions`, {
    method: 'POST',
    body: JSON.stringify({ page, count, sortDirection, sortKind }),
    headers: new Headers({ 'content-type': 'application/json' })
  });
  if (res.status !== HTTPStatus.OK) {
    return null;
  }

  return await res.json();
};
