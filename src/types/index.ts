export type StoreState = {
  fetchPingLevel: FetchPingLevel
  fetchRegionLevel: FetchRegionLevel
  regions: Regions
  currentRegion: Region | null
  fetchRealmLevel: FetchRealmLevel
  realms: Realms
  currentRealm: Realm | null
};

// ping types
export enum FetchPingLevel { initial, fetching, success, failure }

// region types
export enum FetchRegionLevel { initial, fetching, success, failure }

export type RegionName = string;

export type Region = {
  name: RegionName
  hostname: string
};

export type Regions = {
  [key: string]: Region;
};

// realm types
export enum FetchRealmLevel { initial, fetching, success, failure }

export type RealmSlug = string;

export type Realm = {
  type: string;
  population: string;
  queue: boolean;
  status: boolean;
  name: string;
  slug: RealmSlug;
  battlegroup: string;
  locale: string;
  timezone: string;
  connected_realms: RealmSlug[];
};

export type Realms = {
  [key: string]: Realm
};
