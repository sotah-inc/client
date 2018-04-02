export type StoreState = {
  appLevel: AppLevel
  regions: Regions
  currentRegion: Region | null
  realms: Realms
};

export enum AppLevel {
  initial,
  connecting,
  connectSuccess,
  connectFailure,
  fetchingRegions,
  fetchRegionSuccess,
  fetchRegionFailure
}

export type RegionName = string;

export type Region = {
  name: RegionName
  hostname: string
};

export type Regions = {
  [key: string]: Region;
};

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
