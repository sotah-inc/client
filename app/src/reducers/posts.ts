import { CHANGE_IS_DELETE_POST_DIALOG_OPEN, CHANGE_POST, PostsActions } from "@app/actions/posts";
import { defaultPostsState, IPostsState } from "@app/types/posts";
import { runners } from "./handlers";

type State = Readonly<IPostsState> | undefined;

export const posts = (state: State, action: PostsActions): State => {
    if (state === undefined) {
        return defaultPostsState;
    }

    switch (action.type) {
        case CHANGE_POST:
            return { ...state, currentPost: action.payload };
        case CHANGE_IS_DELETE_POST_DIALOG_OPEN:
            return { ...state, isDeletePostDialogOpen: action.payload.isOpen, currentPost: action.payload.post };
        default:
            return runners.post(state, action);
    }
};
