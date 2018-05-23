// region types
export type RegionName = string;

export type Region = {
  name: RegionName
  hostname: string
};

export type Regions = {
  [key: string]: Region
};

// item types
export type ItemId = number;

export enum ItemQuality {
  Poor,
  Common,
  Uncommon,
  Rare,
  Epic,
  Legendary,
  Artifact,
  Heirloom
}

export type Item = {
  id: ItemId
  name: string
  quality: ItemQuality
};

// owner types
export type OwnerName = string;

export type Owner = {
  name: OwnerName
};

// auction types
export type Auction = {
  item: Item
  owner: OwnerName
  ownerRealm: string
  bid: number
  buyout: number
  buyoutPer: number
  quantity: number
  timeLeft: string
  aucList: number[]
};

// error types
export type Errors = {
  [key: string]: string
};

// realm types
export type RealmSlug = string;

export type Realm = {
  regionName: string
  type: string
  population: string
  queue: boolean
  status: boolean
  name: string
  slug: RealmSlug
  battlegroup: string
  locale: string
  timezone: string
  connected_realms: RealmSlug[]
};

export type Realms = {
  [key: string]: Realm
};

// user types
export type User = {
  id: number
  email: string
};

export type Profile = {
  user: User
  token: string
};
