import { ProfileActions, ReceiveUpdateProfile, RequestUpdateProfile } from "@app/actions/profile";
import { IProfileState } from "@app/types/profile";

import { IKindHandlers, Runner } from "./index";

const handlers: IKindHandlers<IProfileState, ProfileActions> = {
    profile: {
        update: {
            receive: (state: IProfileState, action: ReturnType<typeof ReceiveUpdateProfile>) => {
                return state;
            },
            request: (state: IProfileState, action: ReturnType<typeof RequestUpdateProfile>) => {
                return state;
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
