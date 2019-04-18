import { ProfileActions, ReceiveUpdateProfile, RequestUpdateProfile } from "@app/actions/profile";
import { FetchLevel } from "@app/types/main";
import { IProfileState } from "@app/types/profile";

import { IKindHandlers, Runner } from "./index";

const handlers: IKindHandlers<IProfileState, ProfileActions> = {
    profile: {
        update: {
            receive: (state: IProfileState, action: ReturnType<typeof ReceiveUpdateProfile>) => {
                if (typeof action.payload.errors !== "undefined") {
                    return {
                        ...state,
                        updateProfileErrors: action.payload.errors,
                        updateProfileLevel: FetchLevel.failure,
                    };
                }

                if (typeof action.payload.error !== "undefined") {
                    return {
                        ...state,
                        updateProfileErrors: { error: action.payload.error },
                        updateProfileLevel: FetchLevel.failure,
                    };
                }

                return {
                    ...state,
                    updateProfileErrors: {},
                    updateProfileLevel: FetchLevel.success,
                };
            },
            request: (state: IProfileState, _: ReturnType<typeof RequestUpdateProfile>) => {
                return {
                    ...state,
                    updateProfileErrors: {},
                    updateProfileLevel: FetchLevel.fetching,
                };
            },
        },
    },
};

export const run: Runner<IProfileState, ProfileActions> = (
    state: IProfileState,
    action: ProfileActions,
): IProfileState => {
    const [kind, verb, task] = action.type
        .split("_")
        .reverse()
        .map(v => v.toLowerCase());
    if (!(kind in handlers)) {
        return state;
    }
    const kindHandlers = handlers[kind];

    if (!(verb in kindHandlers)) {
        return state;
    }
    const verbHandlers = kindHandlers[verb];

    if (!(task in verbHandlers)) {
        return state;
    }
    const taskHandler = verbHandlers[task];

    return taskHandler(state, action);
};
