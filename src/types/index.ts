export type StoreState = {
  appLevel: AppLevel
  regions: Regions
  currentRegionName: RegionName | null
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

export type Regions = {
  [key: string]: Region;
};

export type Region = {
  name: RegionName
  hostname: string
};
