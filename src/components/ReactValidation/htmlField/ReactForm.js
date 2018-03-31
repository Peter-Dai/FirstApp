import React, { Component } from 'react';
import ReactInput from "./ReactInput";
import Utils from "../utils"
import _ from "lodash"

class ReactForm extends Component {
    constructor(...props) {
        super(...props)

        // init state object
        this.state = {};
        //loop each children and add reletad node into the state once the component is react dom 
        this.props.children.map((child, index, allChildren) => {
            if (typeof child.type === 'function') {
                this.state[child.props.name] = {
                    value: '',
                    valid: !!this.props.formConfig[child.props.name] ? false : true
                }
            }
        })

        this.setFormStateValue = this.setFormStateValue.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }

    // callback method for child component updates state of form.
    setFormStateValue(name, value, valid) {
        let newOne = {};
        newOne[name] = {
            value,
            valid
        };
        this.setState(newOne)
    }

    handleSubmit(e) {
        e.preventDefault();
        let invalidItems = _.map(this.state, (value, key, items) => {
            return Object.assign({}, value, { id: key })
        }).filter(i => !i.valid);

        if (!!invalidItems && invalidItems.length > 0) {
            invalidItems.forEach((i) => {
                let targetDom = e.target.querySelector("[name='" + i.id + "']");

                Utils.validationHelper.validateRule(this.props.formConfig[i.id], targetDom);
            })
        }
        else {
            alert("could be submitted")
        }
    }

    handleChange(e) {
        const {formConfig } = this.props;
        let validationConfig=formConfig[e.target.name];
        //clear all err message once user change the value.
        Utils.removeErrMsg(e.target);

        let isVaild = !!validationConfig ? Utils.validationHelper.validateRule(validationConfig, e.target) : true;

        //update the state of form using callbcak method
        this.setFormStateValue(e.target.name, e.target.value, isVaild)
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {React.Children.map(this.props.children, child => {
                    if (typeof child.type === 'function')
                        return React.cloneElement(child, {
                            val: this.state[child.props.name].value,
                            setValue: this.setFormStateValue,
                            validationConfig: this.props.formConfig[child.props.name],
                            handleChange:this.handleChange,
                            ...child.props
                        })
                    return child;
                })}
            </form>
        );
    }
}

export default ReactForm;