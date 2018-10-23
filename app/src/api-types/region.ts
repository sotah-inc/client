export type regionName = string;

export interface IRegion {
    name: regionName;
    hostname: string;
}

export interface IStatus {
    realms: IRealm[];
}

export type realmSlug = string;

export interface IRealm {
    type: string;
    population: string;
    queue: boolean;
    status: boolean;
    name: string;
    slug: realmSlug;
    battlegroup: string;
    locale: string;
    timezone: string;
    connected_realms: realmSlug[];
    last_modified: number;
}
