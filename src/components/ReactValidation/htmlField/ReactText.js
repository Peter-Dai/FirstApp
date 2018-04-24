import React, { Component } from 'react';
import { withFormApiContext } from "../context/withFormApiContext";
import { withApiContext } from "../context/withApiContext";


class ReactText extends Component {
    constructor(...props) {
        super(...props)
    }

    componentWillMount() {
        //init form state for validation.
        let { name, formApi } = this.props;
        formApi.initFormStateValue(name);
    }

    render() {
        // self props(name,type,onChange) and context props(formApi)
        const { name, type, onChange, formApi } = this.props;
        return (
            <input type='text'
                name={name}
                onChange={(e) => {
                    formApi.handleChange(e);
                    if (onChange) {
                        onChange(e)
                    }
                }}
                value={formApi.getFieldStateValue(name)} />
        );
    }
}

export default withApiContext(ReactText);