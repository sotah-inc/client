import { ExpansionName } from "./expansion";
import { ItemId } from "./item";
import { ProfessionName } from "./profession";

export interface IPreferenceJson {
    id: number;
    current_region: string | null;
    current_realm: string | null;
}

export interface IPricelistEntryJson {
    id: number;
    item_id: ItemId;
    quantity_modifier: number;
}

export interface IPricelistJson {
    id: number;
    name: string;
    pricelist_entries: IPricelistEntryJson[];
}

export interface IProfessionPricelistJson {
    id: number;
    name: ProfessionName;
    expansion: ExpansionName;
}

export enum UserLevel {
    Admin = 60,
    Regular = 5,
}

export interface IUserJson {
    id: number;
    email: string;
    level: UserLevel;
}
