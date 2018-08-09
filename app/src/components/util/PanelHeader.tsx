import * as React from "react";

import { Button, Classes, IconName } from "@blueprintjs/core";

interface IAction {
    title: string;
    onClick: () => void;
    disabled?: boolean;
}

interface IProps {
    title: string;
    prev?: IAction;
    next?: IAction;
}

const actionButton = (action?: IAction, next?: boolean) => {
    if (!action) {
        return <span />;
    }

    const { title, onClick, disabled } = action;

    let style: React.CSSProperties = {};
    let icon: IconName = "chevron-left";
    if (next) {
        icon = "chevron-right";
        style = { marginRight: "5px", marginLeft: "auto" };
    }

    return (
        <span>
            <Button
                className={Classes.PANEL_STACK_HEADER_BACK}
                small={true}
                minimal={true}
                text={title}
                icon={icon}
                onClick={onClick}
                style={style}
                disabled={disabled}
            />
        </span>
    );
};

export const PanelHeader: React.SFC<IProps> = (props: IProps) => {
    return (
        <>
            {actionButton(props.prev)}
            <div className={Classes.HEADING}>{props.title}</div>
            {actionButton(props.next, true)}
        </>
    );
};
