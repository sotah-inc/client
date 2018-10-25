export type RegionName = string;

export interface IRegion {
    name: RegionName;
    hostname: string;
}

export interface IStatus {
    realms: IRealm[];
}

export type RealmSlug = string;

export interface IRealm {
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
    last_modified: number;
}
