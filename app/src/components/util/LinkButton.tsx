import * as React from "react";

import { Button, IButtonProps } from "@blueprintjs/core";
import { RouteComponentProps } from "react-router-dom";

export interface IProps extends RouteComponentProps<{}> {
    destination: string;
    buttonProps: IButtonProps;
}

export const LinkButton: React.SFC<IProps> = (props: IProps) => {
    const { destination, location, history, buttonProps } = props;

    return (
        <Button active={location.pathname === destination} onClick={() => history.push(destination)} {...buttonProps} />
    );
};
