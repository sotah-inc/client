import * as React from 'react';
import * as moment from 'moment';

type Props = {
  targetDate: Date;
};

export const LastModified: React.SFC<Props> = ({ targetDate }: Props) => {
  return (
    <p style={{textAlign: 'right'}}><em>
      Last updated: <abbr title={targetDate.toString()}>{moment(targetDate).fromNow()}</abbr>
    </em></p>
  );
};