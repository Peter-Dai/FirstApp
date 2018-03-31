import React, { Component } from 'react';
import { ReactInput, ReactForm,ReactSelect, Utils } from '../ReactValidation/ReactValidationComponent'

class AddGoods extends Component {
    constructor(...props) {
        super(...props)
        this.state = {
            name: "peter",
            price: "$1",
            category: "test2",
            selectConfig:{
                options:[
                    {text:"text1",value:"t1"},
                    {text:"text2",value:"t2"},
                    {text:"text3",value:"t3"},
                    {text:"text4",value:"t4"},
                    {text:"text5",value:"t5"},
                    {text:"text6",value:"t6"},
                    {text:"text7",value:"t7"},
                    {text:"text8",value:"t8"},
                ],
                defaultOption:{text:"Select",value:""}
            }
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
            },
            bonnie: {
                rules: [
                    {
                        name: Utils.validationType.required,
                        msg: "this is bonnie required"
                    },
                    {
                        name: Utils.validationType.maxLength,
                        rule: 3,
                        msg: "this is bonnie shit"
                    }
                ],
                trigger: "blur"
            },
            tian: {
                rules: [
                    {
                        name: Utils.validationType.required,
                        msg: "this is tian required"
                    },
                    {
                        name: Utils.validationType.maxLength,
                        rule: 3,
                        msg: "this is tian shit"
                    }
                ],
                trigger: "blur"
            }
        }

        this.bonnieChange = this.bonnieChange.bind(this)
    }

    handleChange(e, name) {
        let newOne = {};
        newOne[name] = e.target.value;
        this.setState(newOne)
    }

    bonnieChange(e){
        console.log(e);
        alert("this is boonie call")
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
                <ReactForm formConfig={this.validationConfig}>
                    <ReactInput name="peter" ></ReactInput>
                    <ReactInput name="bonnie" onChange={this.bonnieChange}></ReactInput>
                    <ReactSelect name="tian" selectConfig={this.state.selectConfig}></ReactSelect>
                    
                    <div>peter</div>
                    <input type="text" />
                    <button type="submit" >Submit</button>
                </ReactForm>
            </div>

        );
    }
}

export default AddGoods;