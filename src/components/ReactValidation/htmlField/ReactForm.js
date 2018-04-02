import React, { Component } from 'react';
import ReactInput from "./ReactInput";
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
        this.initFormStateValue = this.initFormStateValue.bind(this)
    }

    // callback method for child component updates state of form.
    setFormStateValue(name, value, valid) {
        this.setState({
            [name]: {
                value,
                valid
            }
        });
    }

    // callback method for child component init state of form.
    initFormStateValue(name) {
        let defaultVaild = !!this.props.formConfig[name] ? false : true
        this.setFormStateValue(name, '', defaultVaild)
    }

    getFormStateValue(name) {
        return Object.assign({}, this.state[name]);
    }

    getFieldConfig(name) {
        return Object.assign({}, this.props.formConfig[name]);
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
                Utils.validationHelper.validateRule(this.props.formConfig[i.id], targetDom);
            })
        }
        else {
            alert("could be submitted")
        }
    }

    handleChange(e) {
        const { formConfig } = this.props;
        let validationConfig = formConfig[e.target.name];
        //clear all err message once user change the value.
        Utils.removeErrMsg(e.target);

        let isVaild = !!validationConfig ? Utils.validationHelper.validateRule(validationConfig, e.target) : true;

        //update the state of form.
        this.setFormStateValue(e.target.name, e.target.value, isVaild)
    }

    render() {
        const { handleChange, setFormStateValue, initFormStateValue } = this;

        return (
            //use context to pass some common methods to all nested component.
            <FormApiContext.Provider value={{ handleChange, setFormStateValue, initFormStateValue }}>
                <form onSubmit={this.handleSubmit}>
                    {this.props.children}
                </form>
            </FormApiContext.Provider>
        );
    }
}

export default ReactForm;