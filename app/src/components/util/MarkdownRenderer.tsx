import * as React from "react";

import * as ReactMarkdown from "react-markdown";
import * as shortcodes from "remark-shortcodes";

import { ShortcodeRenderer } from "./ShortcodeRenderer";

interface IProps {
    body: string;
}

export const MarkdownRenderer: React.SFC<IProps> = ({ body }: IProps) => {
    return (
        <ReactMarkdown
            escapeHtml={false}
            plugins={[shortcodes]}
            source={body}
            renderers={{ shortcode: ShortcodeRenderer }}
        />
    );
};
