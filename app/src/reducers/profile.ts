import { ProfileActions } from "@app/actions/profile";
import { defaultProfileState, IProfileState } from "@app/types/profile";
import { runners } from "./handlers";

type State = Readonly<IProfileState>;

export const posts = (state: State | undefined, action: ProfileActions): State => {
    if (state === undefined) {
        return defaultProfileState;
    }

    switch (action.type) {
        default:
            return runners.profile(state, action);
    }
};
