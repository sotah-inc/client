import * as moment from "moment";
import * as React from "react";

interface IProps {
    targetDate: Date;
}

export const LastModified: React.SFC<IProps> = ({ targetDate }: IProps) => {
    return (
        <p style={{ textAlign: "right" }}>
            <em>
                Last updated: <abbr title={targetDate.toString()}>{moment(targetDate).fromNow()}</abbr>
            </em>
        </p>
    );
};
