import React from 'react';
import { FormApiContext } from "./formApiContext";

export function withFormApiContext(Component) {
  return (props) => {
    return (
      <FormApiContext.Consumer>
        {
          api => <Component {...props} formApi={api}></Component>
        }
      </FormApiContext.Consumer>
    );
  }
}