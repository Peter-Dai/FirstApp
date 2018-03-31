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
                    valid: false
                }
            }
        })

        this.setFormStateValue = this.setFormStateValue.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // callback method for child component updates state of form.
    setFormStateValue(name, value, vaild) {
        let newOne = {};
        newOne[name] = {
            value,
            vaild
        };
        this.setState(newOne)
    }

    handleSubmit(e) {
        e.preventDefault();
        let invaildItems = _.map(this.state, (value, key, items) => {
            return Object.assign({}, value, { id: key })
        }).filter(i => !i.vaild);

        if (!!invaildItems && invaildItems.length > 0) {
            invaildItems.forEach((i) => {
                let targetDom = e.target.querySelector("[name='" + i.id + "']");

                Utils.validationHelper.validateRule(this.props.formConfig[i.id], targetDom);
            })
        }
        else {
            alert("could be submitted")
        }
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
                            ...child.props
                        })
                    return child;
                })}
            </form>
        );
    }
}

export default ReactForm;