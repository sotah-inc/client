import * as React from "react";

import { IProfession } from "@app/api-types/profession";

interface IProps {
    profession: IProfession;
}

export const ProfessionIcon: React.SFC<IProps> = ({ profession }: IProps) => {
    if (profession.icon_url.length === 0) {
        return null;
    }

    return <img src={profession.icon_url} className="item-icon" />;
};
