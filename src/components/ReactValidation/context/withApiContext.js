import React from 'react';
import { FormApiContext } from "./formApiContext";
import { GroupApiContext } from "./groupApiContext";

export function withApiContext(Component) {
    return (props) => {
        const { group } = props;
        const fromApiContext = <FormApiContext.Consumer>
            {
                api => <Component {...props} formApi={api}></Component>
            }
        </FormApiContext.Consumer>;

        const groupApiContext = <GroupApiContext.Consumer>
            {
                api => <Component {...props} formApi={api}></Component>
            }
        </GroupApiContext.Consumer>;


        return (
            // group ? groupApiContext : fromApiContext
            fromApiContext
        );
    }
}