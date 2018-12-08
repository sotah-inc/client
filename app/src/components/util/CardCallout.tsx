import * as React from "react";

import { Card, H4, Icon, IconName } from "@blueprintjs/core";

interface IProps {
    icon: IconName;
    label: string;

    onClick: () => void;
}

export const CardCallout: React.SFC<IProps> = (props: IProps) => {
    const { onClick, icon, label } = props;

    return (
        <div className="card-callout">
            <a onClick={onClick}>
                <Card interactive={true}>
                    <Icon icon={icon} iconSize={40} />
                    <H4>{label}</H4>
                </Card>
            </a>
        </div>
    );
};
