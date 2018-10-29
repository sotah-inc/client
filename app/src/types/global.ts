import { IUserJson } from "@app/api-types/entities";
import { IItemClass, ISubItemClass } from "@app/api-types/item-class";
import { IRealm, IRegion } from "@app/api-types/region";

export interface IRegions {
    [key: string]: IRegion;
}
// error types
export interface IErrors {
    [key: string]: string;
}

// realm types
export interface IRealms {
    [key: string]: IRealm;
}

// user types
export interface IProfile {
    user: IUserJson;
    token: string;
}

// item-classes
export interface ISubItemClasses {
    [key: number]: ISubItemClass;
}

export interface IItemClasses {
    [key: number]: IItemClassWithSub;
}

export interface IItemClassWithSub extends IItemClass {
    subClassesMap: ISubItemClasses;
}
