import * as React from 'react';
import { Button, IconName } from '@blueprintjs/core';
import { RouteComponentProps } from 'react-router-dom';

export interface Props extends RouteComponentProps<Props> {
  icon: IconName;
  text: string;
  destination: string;
}

export const LinkButton: React.SFC<Props> = (props: Props) => {
  const { history, destination, location, icon, text } = props;

  return (
    <Button
      icon={icon}
      text={text}
      active={location.pathname === destination}
      onClick={() => history.push(destination)}
    />
  );
};
