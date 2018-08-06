import * as React from "react";

import { DialogFooter } from "./DialogFooter";

export const DialogActions: React.SFC = props => (
    <DialogFooter>
        <div className="pt-dialog-footer-actions">{props.children}</div>
    </DialogFooter>
);
