import { ProfileActions } from "@app/actions/profile";
import { defaultProfileState, IProfileState } from "@app/types/profile";
import { runners } from "./handlers";

type State = Readonly<IProfileState>;

export const profile = (state: State | undefined, action: ProfileActions): State => {
    if (state === undefined) {
        return defaultProfileState;
    }

    return runners.profile(state, action);
};
