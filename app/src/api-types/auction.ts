import { ItemId } from "./item";
import { RealmSlug } from "./region";

export type OwnerName = string;

export interface IOwner {
    name: OwnerName;
    normalized_name: string;
}

export interface IAuctionRealm {
    name: string;
    slug: RealmSlug;
}

export interface IAuction {
    itemId: ItemId;
    owner: OwnerName;
    ownerRealm: string;
    bid: number;
    buyout: number;
    buyoutPer: number;
    quantity: number;
    timeLeft: string;
    aucList: number[];
}
