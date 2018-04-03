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

    componentDidMount(){
        this.initFormStateValue(this.props.name);
    }

    initFormStateValue(name) {
        const groupName = this.props.name;
        let defaultVaild = !!this.props.formApi.getFieldConfig(groupName) ? false : true
        this.setFormStateValue(groupName, '', defaultVaild)
    }

    // callback method for child component updates state of form.
    setFormStateValue(name, value, valid) {
        const groupName = this.props.name;

        this.props.formApi.setFormStateValue(groupName,value,valid)
    }

    handleChange(e) {
        const targetDom = e.target, groupName = this.props.name;
        let validationConfig = this.props.formApi.getFieldConfig(groupName);
        const groupDom =document.querySelector("[name='" + groupName + "']")
        //clear all err message once user change the value.
        
        Utils.removeErrMsg(groupDom);

        let isVaild = !!validationConfig ? Utils.validationHelper.validateRule(validationConfig, targetDom,groupDom) : true;

        //update the state of form.
        let currentValue = Utils.retrieveDomValue(targetDom)
        this.setFormStateValue(groupName, currentValue, isVaild)
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
                <div name ={this.props.name}>
                    {this.props.children}
                </div>
            </GroupApiContext.Provider>
        );
    }
}

export default withFormApiContext(ReactGroup);