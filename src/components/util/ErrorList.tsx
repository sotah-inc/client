import * as React from 'react';
import { FormGroup, Intent } from '@blueprintjs/core';

import { Errors } from '@app/types/global';

type Props = Readonly<{
  errors: Errors
}>;

const renderError = (value: string, index: number) => {
  return (
    <FormGroup key={index} helperText={value} intent={Intent.DANGER} />
  );
};

export const ErrorList: React.SFC<Props> = ({ errors }: Props) => {
  return (
    <>
      {Object.keys(errors).map((v, i) => renderError(errors[v], i))}
    </>
  );
};