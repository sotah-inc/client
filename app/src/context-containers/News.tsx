import React, { createContext, useReducer } from "react";

import { posts } from "@app/reducers/posts";
import { defaultPostsState, IPostsState } from "@app/types/posts";

export const NewsContext = createContext<IPostsState>(defaultPostsState);

export function NewsContextContainer() {
    const [state] = useReducer(posts, defaultPostsState);

    return (
        <NewsContext.Provider value={state}>
            <p>Hello, world!</p>
        </NewsContext.Provider>
    );
}
