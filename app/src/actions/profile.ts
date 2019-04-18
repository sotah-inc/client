import { Dispatch } from "redux";

import { IUpdateProfileRequest } from "@app/api-types/contracts/user/profile";
import { IUpdateProfileResult, updateProfile } from "@app/api/profile";
import { ActionsUnion, createAction } from "./helpers";

export const REQUEST_UPDATE_PROFILE = "REQUEST_UPDATE_PROFILE";
export const RECEIVE_UPDATE_PROFILE = "RECEIVE_UPDATE_PROFILE";
export const RequestUpdateProfile = () => createAction(REQUEST_UPDATE_PROFILE);
export const ReceiveUpdateProfile = (payload: IUpdateProfileResult) => createAction(RECEIVE_UPDATE_PROFILE, payload);
type FetchUpdateProfileType = ReturnType<typeof RequestUpdateProfile | typeof ReceiveUpdateProfile>;
export const FetchUpdateProfile = (token: string, request: IUpdateProfileRequest) => {
    return async (dispatch: Dispatch<FetchUpdateProfileType>) => {
        dispatch(RequestUpdateProfile());
        dispatch(ReceiveUpdateProfile(await updateProfile(token, request)));
    };
};

export const ProfileActions = {
    ReceiveUpdateProfile,
    RequestUpdateProfile,
};

export type ProfileActions = ActionsUnion<typeof ProfileActions>;
