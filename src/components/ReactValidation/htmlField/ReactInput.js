import React, { Component } from 'react';
import Validator from "../validator"
import Utils from "../utils"

class ReactInput extends Component {
    constructor(...props) {
        super(...props)
    }

    render() {
        const { name, val, onChange } = this.props
        return (
            <input type="text" name={name} value={val} onChange={(e) => { this.props.handleChange(e); if (onChange) { onChange(e) } }} />
        );
    }
}

export default ReactInput;