import { PostsActions, ReceiveCreatePost } from "@app/actions/posts";
import { IPostsState } from "@app/types/posts";

import { FetchLevel } from "@app/types/main";

import { IKindHandlers, Runner } from "./index";

const handlers: IKindHandlers<IPostsState, PostsActions> = {
    post: {
        create: {
            receive: (state: IPostsState, action: ReturnType<typeof ReceiveCreatePost>) => {
                if (action.payload === null) {
                    return { ...state, createPostLevel: FetchLevel.failure };
                }

                return {
                    ...state,
                    createPostLevel: FetchLevel.success,
                    currentPost: action.payload.post!,
                    posts: [...state.posts, action.payload.post!],
                };
            },
            request: (state: IPostsState) => {
                return { ...state, createPostLevel: FetchLevel.fetching };
            },
        },
    },
};

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
