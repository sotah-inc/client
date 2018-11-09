import * as React from "react";

import { Button, IButtonProps } from "@blueprintjs/core";
import { RouteComponentProps } from "react-router-dom";

export interface IProps extends RouteComponentProps<{}> {
    destination: string;
    buttonProps: IButtonProps;
    prefix?: boolean;
}

export const LinkButton: React.SFC<IProps> = (props: IProps) => {
    const { destination, location, history, buttonProps, prefix } = props;

    const active: boolean = (() => {
        if (typeof prefix === "undefined") {
            return location.pathname === destination;
        }

        return location.pathname.startsWith(destination);
    })();

    return <Button active={active} onClick={() => history.push(destination)} {...buttonProps} />;
};
