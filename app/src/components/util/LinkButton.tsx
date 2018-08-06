import * as React from "react";

import { Button, IconName } from "@blueprintjs/core";
import { RouteComponentProps } from "react-router-dom";

export interface IProps extends RouteComponentProps<IProps> {
    icon: IconName;
    text: string;
    destination: string;
}

const onClick = (props: IProps) => {
    return () => props.history.push(props.destination);
};

export const LinkButton: React.SFC<IProps> = (props: IProps) => {
    const { destination, location, icon, text } = props;

    return <Button icon={icon} text={text} active={location.pathname === destination} onClick={onClick(props)} />;
};
