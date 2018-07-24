import * as HTTPStatus from 'http-status';

import { apiEndpoint } from './index';
import { RegionName, RealmSlug, Errors } from '@app/types/global';
import { Pricelist, PricelistEntry } from '@app/types/price-lists';

export type CreatePricelistRequest = {
  pricelist: {
    name: string
    region: RegionName
    realm: RealmSlug
  }
  entries: {
    item_id: number
    quantity_modifier: number
  }[]
};

export type CreatePricelistResponse = {
  errors: Errors | null
  data: {
    pricelist: Pricelist
    entries: PricelistEntry[]
  } | null
};

export const createPricelist = async (
  token: string,
  request: CreatePricelistRequest
): Promise<CreatePricelistResponse> => {
  const res = await fetch(`${apiEndpoint}/user/pricelists`, {
    method: 'POST',
    body: JSON.stringify(request),
    headers: new Headers({
      'content-type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
  });
  switch (res.status) {
    case HTTPStatus.CREATED:
      return { errors: null, data: await res.json() };
    case HTTPStatus.UNAUTHORIZED:
      return { errors: { error: 'Unauthorized' }, data: null };
    case HTTPStatus.BAD_REQUEST:
    default:
      return { errors: await res.json(), data: null };
  }
};

export type GetPricelistsOptions = {
  token: string
  regionName: RegionName
  realmSlug: RealmSlug
};

export type GetPricelistsResponse = {
  pricelists: Pricelist[]
};

export const getPricelists = async(opts: GetPricelistsOptions): Promise<GetPricelistsResponse> => {
  const res = await fetch(`${apiEndpoint}/user/pricelists/region/${opts.regionName}/realm/${opts.realmSlug}`, {
    method: 'GET',
    headers: new Headers({
      'content-type': 'application/json',
      'Authorization': `Bearer ${opts.token}`
    })
  });

  return await res.json();
};
