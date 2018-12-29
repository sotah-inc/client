import * as React from "react";

import * as ReactMarkdown from "react-markdown";

import { IPostJson } from "@app/api-types/entities";

interface IProps {
    post: IPostJson;
}

export const PostRenderer: React.SFC<IProps> = ({ post }: IProps) => {
    return <ReactMarkdown source={post.body} />;
};
