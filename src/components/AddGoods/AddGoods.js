import React, { Component } from 'react';
import { ReactInput, ReactForm ,Utils} from '../ReactValidation/ReactValidationComponent'

class AddGoods extends Component {
    constructor(...props) {
        super(...props)
        this.state = {
            name: "peter",
            price: "$1",
            category: "test2"
        }

        // Config validation
        this.validationConfig = {
            peter: {
                rules: [
                    {
                        name: Utils.validationType.required,
                        msg: "this is required"
                    },
                    {
                        name: Utils.validationType.maxLength,
                        rule: 3,
                        msg: "this is shit"
                    }
                ],
                trigger: "blur"
            }
        }
    }

    handleChange(e, name) {
        let newOne = {};
        newOne[name] = e.target.value;
        this.setState(newOne)
    }

    emitAdd() {
        this.props.handleAddEvent(this.state)
    }

    render() {
        return (
            <div>
                <div>
                    <label>Name:<input type="text" value={this.state.name} onChange={(e) => this.handleChange.call(this, e, "name")} /></label>
                </div>
                <div>
                    <label>categery:
                        <select value={this.state.category} onChange={(e) => this.handleChange.call(this, e, "category")}>
                            <option value=""> selcet</option>
                            <option value="test1"> test1</option>
                            <option value="test2"> test2</option>
                            <option value="test3"> test3</option>
                            <option value="test4"> test4</option>
                            <option value="test5"> test5</option>
                            <option value="test6"> test6</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label>Price:<input type="text" value={this.state.price} onChange={(e) => this.handleChange.call(this, e, "price")} /></label>
                </div>
                <button onClick={() => this.emitAdd.call(this)}>Add</button>
                <ReactForm>
                    <ReactInput name="peter" validationConfig={this.validationConfig.peter} ></ReactInput>
                    <div>peter</div>
                    <input type="text" />
                </ReactForm>
            </div>

        );
    }
}

export default AddGoods;