import * as React from "react";

import * as ReactMarkdown from "react-markdown";
import * as shortcodes from "remark-shortcodes";

import { IPostJson } from "@app/api-types/entities";
import { ShortcodeRenderer } from "./ShortcodeRenderer";

interface IProps {
    post: IPostJson;
}

export const PostRenderer: React.SFC<IProps> = ({ post }: IProps) => {
    return (
        <ReactMarkdown
            escapeHtml={false}
            plugins={[shortcodes]}
            source={post.body}
            renderers={{ shortcode: ShortcodeRenderer }}
        />
    );
};
