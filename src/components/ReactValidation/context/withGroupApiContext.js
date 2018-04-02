import React from 'react';
import { GroupApiContext } from "./groupApiContext";

export function withGroupApiContext(Component) {
  return (props) => {
    return (
      <GroupApiContext.Consumer>
        {
          api => <Component {...props} groupApi={api}></Component>
        }
      </GroupApiContext.Consumer>
    );
  }
}