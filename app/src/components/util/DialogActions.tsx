import * as React from "react";

import { Classes } from "@blueprintjs/core";

import { DialogFooter } from "./DialogFooter";

interface IProps {
    leftChildren?: React.ReactNode;
}

const renderLeftChildren = (children?: React.ReactNode) => {
    if (!children) {
        return null;
    }

    return <div className={`${Classes.DIALOG_FOOTER_ACTIONS} ${Classes.ALIGN_LEFT}`}>{children}</div>;
};

export const DialogActions: React.SFC<IProps> = props => (
    <DialogFooter>
        {renderLeftChildren(props.leftChildren)}
        <div className={`${Classes.DIALOG_FOOTER_ACTIONS} ${Classes.ALIGN_RIGHT}`}>{props.children}</div>
    </DialogFooter>
);
