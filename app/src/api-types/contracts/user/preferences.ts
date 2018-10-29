import { IPreferenceJson } from "../../entities";
import { RealmSlug, RegionName } from "../../region";

export interface IGetPreferencesResponse {
    preference: IPreferenceJson;
}

export interface ICreatePreferencesRequest {
    id?: number;
    current_region: RegionName | null;
    current_realm: RealmSlug | null;
}

export type ICreatePreferencesResponse = IGetPreferencesResponse;

export type IUpdatePreferencesRequest = ICreatePreferencesRequest;

export type IUpdatePreferencesResponse = IGetPreferencesResponse;
