import * as React from 'react';
import { FormGroup, Card } from '@blueprintjs/core';

export class Register extends React.Component {
  render() {
    return (
      <Card>
        <FormGroup
          helperText="Helper text with details..."
          label="Label A"
          labelFor="text-input"
          requiredLabel={true}
        >
          <input id="text-input" placeholder="Placeholder text" />
        </FormGroup>
      </Card>
    );
  }
}
