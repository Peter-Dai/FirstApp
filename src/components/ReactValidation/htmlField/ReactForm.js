import React, { Component } from 'react';
import ReactInput from "./ReactInput";

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
    setFormStateValue(name, val) {
        let newOne = {};
        newOne[name] = {
            value: val,
            vaild: true
        };
        this.setState(newOne)
    }

    handleSubmit() {
        
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {React.Children.map(this.props.children, child => {
                    if (typeof child.type === 'function')
                        return React.cloneElement(child, {
                            val: this.state[child.props.name].value,
                            setValue: this.setFormStateValue,
                            ...child.props
                        })
                    return child;
                })}
            </form>
        );
    }
}

export default ReactForm;