import * as React from "react";

import { Button, Classes } from "@blueprintjs/core";

interface IPrev {
    title: string;
    onClick: () => void;
}

interface IProps {
    title: string;
    prev?: IPrev;
}

const backButton = (prev?: IPrev) => {
    if (!prev) {
        return <span />;
    }

    return (
        <span>
            <Button
                className={Classes.PANEL_STACK_HEADER_BACK}
                small={true}
                minimal={true}
                text={prev.title}
                icon="chevron-left"
                onClick={prev.onClick}
            />
        </span>
    );
};

export const PanelHeader: React.SFC<IProps> = (props: IProps) => {
    return (
        <>
            {backButton(props.prev)}
            <div className={Classes.HEADING}>{props.title}</div>
            <span />
        </>
    );
};
