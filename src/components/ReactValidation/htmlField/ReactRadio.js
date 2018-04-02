import React, { Component } from 'react';
import { withFormApiContext } from "../context/withFormApiContext";

class ReactRadio extends Component {
    constructor(...props) {
        super(...props)
    }

    componentDidMount() {
        //init form state for validation.
        let { name, formApi } = this.props;
        formApi.initFormStateValue(name);
    }

    render() {
        // self props(name,type,onChange) and context props(formApi)
        const { name, type, value, onChange, formApi } = this.props;
        return (
            <input type='radio'
                name={name}
                onChange={(e) => {
                    formApi.handleChange(e);
                    if (onChange) {
                        onChange(e)
                    }
                }}
                value={value}
                checked={formApi.getFormStateValue} />
        );
    }
}

export default withFormApiContext(ReactRadio);