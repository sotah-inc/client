import * as React from "react";

import { Classes } from "@blueprintjs/core";

export const DialogBody: React.SFC = props => <div className={Classes.DIALOG_BODY}>{props.children}</div>;
