export type RegionName = string;

export interface IRegion {
    name: RegionName;
    hostname: string;
}

export interface IStatus {
    realms: IRealm[];
}

export type RealmSlug = string;

export enum RealmPopulation {
    na = "n/a",
    medium = "medium",
    high = "high",
    full = "full",
}

export interface IRealm {
    regionName: RegionName;
    type: string;
    population: RealmPopulation;
    queue: boolean;
    status: boolean;
    name: string;
    slug: RealmSlug;
    battlegroup: string;
    locale: string;
    timezone: string;
    connected_realms: RealmSlug[];
    realm_modification_dates: {
        downloaded: number;
        live_auctions_received: number;
        pricelist_histories_received: number;
    };
}
