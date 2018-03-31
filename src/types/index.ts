export type StoreState = {
  appLevel: AppLevel
  regions: Region[]
};

export enum AppLevel {
  initial,
  connecting,
  connectSuccess,
  connectFailure
}

export type Region = {
  name: string
  hostname: string
};
