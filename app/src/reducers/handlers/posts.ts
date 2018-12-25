import { PostsActions } from "@app/actions/posts";
import { IPostsState } from "@app/types/posts";

import { IKindHandlers, Runner } from "./index";

const handlers: IKindHandlers<IPostsState, PostsActions> = {};

export const run: Runner<IPostsState, PostsActions> = (state: IPostsState, action: PostsActions): IPostsState => {
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
