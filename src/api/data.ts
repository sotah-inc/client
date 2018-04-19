import * as HTTPStatus from 'http-status';

import { apiEndpoint } from './index';
import { Auction, Region, Realm } from '../types/global';

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

export type AuctionsResponse = {
  auctions: Auction[] | null
  total: number
};

export const getAuctions = async (regionName: string, realmSlug: string): Promise<AuctionsResponse | null> => {
  const res = await fetch(`${apiEndpoint}/region/${regionName}/realm/${realmSlug}/auctions`);
  if (res.status !== HTTPStatus.OK) {
    return null;
  }

  return await res.json();
};
