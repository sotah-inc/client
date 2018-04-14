import * as HTTPStatus from 'http-status';

import { apiEndpoint } from './index';
import { Region, Realm, Auction } from '../types';

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

type AuctionsResponse = {
  realms: Realm[] | null
  auctions: Auction[] | null
};

export const getAuctions = async (regionName: string, realmSlug: string): Promise<Auction[] | null> => {
  const res = await fetch(`${apiEndpoint}/region/${regionName}/realm/${realmSlug}/auctions`);
  if (res.status !== HTTPStatus.OK) {
    return null;
  }

  const data: AuctionsResponse = await res.json();
  if (data.auctions === null) {
    return [];
  }

  return data.auctions;
};
