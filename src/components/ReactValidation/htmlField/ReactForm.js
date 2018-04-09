import React, { Component } from 'react';
import ReactText from "./ReactText";
import Utils from "../utils"
import _ from "lodash"
import { FormApiContext } from "../context/formApiContext";
class ReactForm extends Component {
    constructor(...props) {
        super(...props)
        // init state object
        this.state = {};

        this.setFormStateValue = this.setFormStateValue.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.initFormStateValue = this.initFormStateValue.bind(this);
        this.getFieldConfig = this.getFieldConfig.bind(this);
        this.getFormStateValue = this.getFormStateValue.bind(this);
    }

    // callback method for child component updates state of form.
    setFormStateValue(name, value, valid, error) {
        this.setState({
            [name]: {
                value,
                valid,
                error
            }
        });
    }

    // callback method for child component init state of form.
    initFormStateValue(name) {
        let targetConfig = this.props.formConfig[name];
        let defaultVaild = !!targetConfig && !!targetConfig.rules.find(i => i.name == Utils.validationType.required) ? false : true
        let defaultErr = !defaultVaild ? { name: Utils.validationType.required, msg: targetConfig.rules.find(i => i.name == Utils.validationType.required).msg } : null;
        this.setFormStateValue(name, '', defaultVaild, defaultErr);
    }

    getFormStateValue(name) {
        if (!this.state[name]) return null;
        return Object.assign({}, this.state[name]);
    }

    getFieldConfig(name) {
        return Object.assign({}, this.props.formConfig[name] || null);
    }

    handleSubmit(e) {
        //prevent bubble event of button and <a>
        e.preventDefault();

        //use lodash convert object to array for looping and filtering all validation status.
        let invalidItems = _.map(this.state, (value, key, items) => {
            return Object.assign({}, value, { id: key })
        }).filter(i => !i.valid);

        if (!!invalidItems && invalidItems.length > 0) {
            //If exist errors
            invalidItems.forEach((i) => {
                //retrieve current dom through by target field of event object.
                let targetDom = e.target.querySelector("[name='" + i.id + "']");
                //trigger the specified validaiton for invaild item.
                let targetError = this.getFormStateValue(i.id).error;
                Utils.showErrMsg(targetDom, targetError.msg)
            })
        }
        else {
            alert("could be submitted")
        }
    }

    handleChange(e) {
        const targetDom = e.target;
        let validationConfig = this.getFieldConfig(targetDom.name);
        //clear all err message once user change the value.
        Utils.removeErrMsg(targetDom);

        let error = Utils.validationHelper.validateRule(validationConfig, targetDom, targetDom);

        let isVaild = !!validationConfig ? !error : true;

        //update the state of form.
        let currentValue = Utils.retrieveDomValue(targetDom)
        this.setFormStateValue(targetDom.name, currentValue, isVaild, error)
    }

    render() {
        const { handleChange, setFormStateValue, initFormStateValue, getFormStateValue, getFieldConfig } = this;

        return (
            //use context to pass some common methods to all nested component.
            <FormApiContext.Provider value={{ handleChange, setFormStateValue, getFormStateValue, initFormStateValue, getFieldConfig }}>
                <form onSubmit={this.handleSubmit}>
                    {this.props.children}
                </form>
            </FormApiContext.Provider>
        );
    }
}

export default ReactForm;