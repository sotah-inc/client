import * as React from "react";

import { Button, IconName } from "@blueprintjs/core";
import { RouteComponentProps } from "react-router-dom";

export interface IProps extends RouteComponentProps<IProps> {
    icon: IconName;
    text: string;
    destination: string;
}

export const LinkButton: React.SFC<IProps> = (props: IProps) => {
    const { destination, location, icon, text, history } = props;

    return (
        <Button
            icon={icon}
            text={text}
            active={location.pathname === destination}
            onClick={() => history.push(destination)}
        />
    );
};
