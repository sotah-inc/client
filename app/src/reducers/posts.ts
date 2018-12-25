import { PostsActions } from "@app/actions/posts";
import { defaultPostsState, IPostsState } from "@app/types/posts";
import { runners } from "./handlers";

type State = Readonly<IPostsState> | undefined;

export const posts = (state: State, action: PostsActions): State => {
    if (state === undefined) {
        return defaultPostsState;
    }

    switch (action.type) {
        default:
            return runners.post(state, action);
    }
};
