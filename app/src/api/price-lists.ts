import * as HTTPStatus from 'http-status';

import { apiEndpoint } from './index';
import { RegionName, RealmSlug, Errors, ItemsMap } from '@app/types/global';
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

export type UpdatePricelistRequest = {
  token: string
  pricelist: Pricelist
  entries: PricelistEntry[]
};

export type UpdatePricelistResponse = {
  errors: Errors | null
  data: {
    pricelist: Pricelist
    entries: PricelistEntry[]
  } | null
};

export const updatePricelist = async (request: UpdatePricelistRequest): Promise<UpdatePricelistResponse> => {
  const res = await fetch(`${apiEndpoint}/user/pricelists/${request.pricelist.id}`, {
    method: 'PUT',
    body: JSON.stringify(request),
    headers: new Headers({
      'content-type': 'application/json',
      'Authorization': `Bearer ${request.token}`
    })
  });
  switch (res.status) {
    case HTTPStatus.OK:
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
  items: ItemsMap
};

export const getPricelists = async (opts: GetPricelistsOptions): Promise<GetPricelistsResponse> => {
  const res = await fetch(`${apiEndpoint}/user/pricelists/region/${opts.regionName}/realm/${opts.realmSlug}`, {
    method: 'GET',
    headers: new Headers({
      'content-type': 'application/json',
      'Authorization': `Bearer ${opts.token}`
    })
  });

  return await res.json();
};

export type DeletePricelistRequestOptions = {
  token: string
  id: number
};

export const deletePricelist = async (opts: DeletePricelistRequestOptions): Promise<number | null> => {
  const res = await fetch(`${apiEndpoint}/user/pricelists/${opts.id}`, {
    method: 'DELETE',
    headers: new Headers({
      'content-type': 'application/json',
      'Authorization': `Bearer ${opts.token}`
    })
  });
  switch (res.status) {
    case HTTPStatus.OK:
      return opts.id;
    default:
      return null;
  }
};
