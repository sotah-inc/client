import * as React from 'react';
import { Button } from '@blueprintjs/core';
import { withRouter } from 'react-router-dom';

export const HomeButton = withRouter(({ history }) => {
  return (
    <Button
      className="pt-minimal"
      icon="home"
      text="Home"
      onClick={() => history.push('/')}
    />
  );
});
