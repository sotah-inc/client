import * as HTTPStatus from 'http-status';
import { Region, Realm } from './types';

export const apiEndpoint = 'http://localhost:8080';

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
  const res = await fetch(`${apiEndpoint}/status/${regionName}`);
  if (res.status !== HTTPStatus.OK) {
    return null;
  }

  return await res.json();
};
