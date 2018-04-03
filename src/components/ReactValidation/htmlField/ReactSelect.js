import React, { Component } from 'react';
import Validator from "../validator";
import Utils from "../utils";
import { FormApiContext } from "../context/formApiContext";
import { withFormApiContext } from "../context/withFormApiContext";
import { withApiContext } from "../context/withApiContext";


class ReactSelect extends Component {
    constructor(...props) {
        super(...props)
    }

    componentDidMount() {
        let { name, formApi } = this.props;
        formApi.initFormStateValue(name);
    }

    componentDidCatch() {
        console.log("=================did catch================")

    }

    componentDidUpdate() {
        console.log("=================did update================")

    }

    componentWillReceiveProps() {
        console.log("=================Will receive props================")

    }

    componentWillUnmount() {
        console.log("=================Will unmount================")

    }

    componentWillUpdate() {
        console.log("=================Will update================")
    }

    componentWillMount() {
        console.log("=================Will mount================")
    }

    render() {
        console.log("----------------start render------------------")
        const { name, selectConfig, onChange, formApi } = this.props;
        const { options, defaultOption } = selectConfig;

        //create options.
        const defaultOptionDom = !!defaultOption ? <option key={-1} value={defaultOption.value}>{defaultOption.text}</option> : '';
        const childOptionsDom = options.map((i, index) => {
            return <option key={index} value={i.value}>{i.text}</option>
        });

        return (
            <select type="text"
                name={name}
                value={formApi.getFormStateValue}
                onChange={(e) => {
                    formApi.handleChange(e);
                    if (onChange) {
                        onChange(e)
                    }
                }} >
                {defaultOptionDom}
                {childOptionsDom}
            </select>
        );

    }
}

export default withApiContext(ReactSelect);