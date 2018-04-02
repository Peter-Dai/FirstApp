import React, { Component } from 'react';
import { withFormApiContext } from "../context/withFormApiContext";

class ReactInput extends Component {
    constructor(...props) {
        super(...props)
    }

    componentDidMount() {
        //init form state for validation.
        let { name, formApi } = this.props;
        formApi.initFormStateValue(name);
    }

    render() {
        // self props(name,onChange) and context props(formApi)
        const { name, onChange, formApi } = this.props;
        return (
            <input type="text"
                name={name}
                onChange={(e) => {
                    formApi.handleChange(e);
                    if (onChange) {
                        onChange(e)
                    }
                }}
                value={formApi.getFormStateValue} />
        );
    }
}

export default withFormApiContext(ReactInput);