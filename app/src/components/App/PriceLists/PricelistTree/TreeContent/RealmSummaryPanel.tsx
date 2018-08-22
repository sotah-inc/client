import * as React from "react";

import { IRealm } from "@app/types/global";

export interface IStateProps {
    currentRealm: IRealm | null;
}

export type Props = Readonly<IStateProps>;

export class RealmSummaryPanel extends React.Component<Props> {
    public render() {
        return <p>Hello, world!</p>;
    }
}
