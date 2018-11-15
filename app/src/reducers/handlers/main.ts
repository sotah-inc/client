import { MainActions } from "@app/actions/main";
import { IMainState } from "@app/types/main";

import { IKindHandlers, Runner } from "./index";

const handlers: IKindHandlers<IMainState, MainActions> = {};

export const run: Runner<IMainState, MainActions> = (state: IMainState, action: MainActions): IMainState => {
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
