import * as React from "react";

import ReactMarkdown from "react-markdown";

// tslint:disable-next-line:no-var-requires
const shortcodes = require("remark-shortcodes");

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
