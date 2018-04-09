import React, { Component } from 'react';
import { GroupApiContext } from "../context/groupApiContext";
import { withFormApiContext } from "../context/withFormApiContext";
import Utils from "../utils"

class ReactGroup extends Component {

    constructor(...props) {
        super(...props);
        this.peter = this.peter.bind(this);

        this.setFormStateValue = this.setFormStateValue.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.initFormStateValue = this.initFormStateValue.bind(this)
    }

    componentDidMount() {
        this.initFormStateValue(this.props.name);
    }

    initFormStateValue(name) {
        const groupName = this.props.name;

        let currentGroupState = this.props.formApi.getFormStateValue(groupName);

        if (!!currentGroupState) {
             currentGroupState.value[name]='';

             let {value,valid,error} = currentGroupState;
             this.setFormStateValue(groupName, value, valid, error)

        }
        else {
            let targetConfig = this.props.formApi.getFieldConfig(groupName);
            let defaultVaild = !!targetConfig && !!targetConfig.rules.find(i => i.name == Utils.validationType.required) ? false : true
            let defaultErr = !defaultVaild ? { name: Utils.validationType.required, msg: targetConfig.rules.find(i => i.name == Utils.validationType.required).msg } : null;

            this.setFormStateValue(groupName, { name, value: '' }, defaultVaild, defaultErr)
        }
    }

    // callback method for child component updates state of form.
    setFormStateValue(name, value, valid, error) {
        const groupName = this.props.name;

        this.props.formApi.setFormStateValue(groupName, value, valid, error)
    }

    handleChange(e) {
        const targetDom = e.target, groupName = this.props.name;
        let validationConfig = this.props.formApi.getFieldConfig(groupName);
        const groupDom = document.querySelector("[name='" + groupName + "']")
        //clear all err message once user change the value.

        Utils.removeErrMsg(groupDom);

        let error = Utils.validationHelper.validateRule(validationConfig, targetDom, groupDom);

        let isVaild = !!validationConfig ? !error : true;

        //update the state of form.
        let currentValue = Utils.retrieveDomValue(targetDom)
        this.setFormStateValue(groupName, currentValue, isVaild, error)
        alert("this is group!")
    }

    peter() {

    }

    render() {
        // const { peter } = this;
        // const peter =true
        const { handleChange, setFormStateValue, initFormStateValue } = this;
        return (
            <GroupApiContext.Provider value={{ handleChange, setFormStateValue, initFormStateValue }}>
                <div name={this.props.name}>
                    {this.props.children}
                </div>
            </GroupApiContext.Provider>
        );
    }
}

export default withFormApiContext(ReactGroup);