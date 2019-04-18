import { FetchLevel } from "./main";

export interface IProfileState {
    updateProfileLevel: FetchLevel;
    updateProfileErrors: {
        [key: string]: string;
    };
}

export const defaultProfileState: IProfileState = {
    updateProfileErrors: {},
    updateProfileLevel: FetchLevel.initial,
};
