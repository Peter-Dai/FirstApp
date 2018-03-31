import React, { Component } from 'react';
import Validator from "../validator"
import Utils from "../utils"

class ReactSelect extends Component {
    constructor(...props) {
        super(...props)
    }

    render() {
        const { name, val, selectConfig, onChange } = this.props;
        const { options, defaultOption } = selectConfig;
        return (
            <select type="text" name={name} value={val} onChange={(e) => { this.props.handleChange(e); if (onChange) { onChange(e) } }} >
                {!!defaultOption ? <option key={-1} value={defaultOption.value}>{defaultOption.text}</option> : ''}
                {options.map((i, index) => {
                    return <option key={index} value={i.value}>{i.text}</option>
                })}
            </select>
        );
    }
}

export default ReactSelect;