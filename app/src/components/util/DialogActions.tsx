import * as React from "react";

import { Classes } from "@blueprintjs/core";

import { DialogFooter } from "./DialogFooter";

export const DialogActions: React.SFC = props => (
    <DialogFooter>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>{props.children}</div>
    </DialogFooter>
);
