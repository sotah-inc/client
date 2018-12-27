import { PostsActions, ReceiveCreatePost, ReceiveGetPosts } from "@app/actions/posts";
import { IValidationErrorResponse } from "@app/api-types/contracts";
import { FetchLevel } from "@app/types/main";
import { IPostsState } from "@app/types/posts";

import { IKindHandlers, Runner } from "./index";

const handlers: IKindHandlers<IPostsState, PostsActions> = {
    post: {
        create: {
            receive: (state: IPostsState, action: ReturnType<typeof ReceiveCreatePost>) => {
                if (action.payload.post === null) {
                    const createPostErrors: IValidationErrorResponse = (() => {
                        if (typeof action.payload.error !== "undefined") {
                            return { error: action.payload.error };
                        }

                        return action.payload.errors!;
                    })();

                    return { ...state, createPostLevel: FetchLevel.failure, createPostErrors };
                }

                return {
                    ...state,
                    createPostErrors: {},
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
    posts: {
        get: {
            receive: (state: IPostsState, action: ReturnType<typeof ReceiveGetPosts>) => {
                if (typeof action.payload.error !== "undefined") {
                    return { ...state, getPostsLevel: FetchLevel.failure };
                }

                return { ...state, getPostsLevel: FetchLevel.success, posts: action.payload.posts };
            },
            request: (state: IPostsState) => {
                return { ...state, getPostsLevel: FetchLevel.fetching };
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
