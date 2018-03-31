import React, { Component } from 'react';
import Validator from "../validator"
import Utils from "../utils"

class ReactInput extends Component {
    constructor(...props) {
        super(...props)
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const { onChange, setValue, validationConfig } = this.props;

        //clear all err message once user change the value.
        Utils.removeErrMsg(e.target);

        let isVaild = !!validationConfig ? Utils.validationHelper.validateRule(validationConfig, e.target) : true;

        //update the state of form using callbcak method
        setValue(e.target.name, e.target.value, isVaild)

        //check if exist custom "change" method. if exists, execute it.
        if (onChange) {
            onChange(e)
        }
    }

    render() {
        const { name, val } = this.props
        return (
            <input type="text" name={name} value={val} onChange={this.handleChange} />
        );
    }
}

export default ReactInput;