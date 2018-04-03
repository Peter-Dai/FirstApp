import React, { Component } from 'react';
import { ReactText, ReactForm, ReactSelect, ReactRadio, ReactCheckBox, Utils } from '../ReactValidation/ReactValidationComponent'
import ReactGroup from '../ReactValidation/htmlField/ReactGroup';

class AddGoods extends Component {
    constructor(...props) {
        super(...props)
        this.state = {
            name: "peter",
            price: "$1",
            category: "test2",
            selectConfig: {
                options: [
                    { text: "text1", value: "t1" },
                    { text: "text2", value: "t2" },
                    { text: "text3", value: "t3" },
                    { text: "text4", value: "t4" },
                    { text: "text5", value: "t5" },
                    { text: "text6", value: "t6" },
                    { text: "text7", value: "t7" },
                    { text: "text8", value: "t8" },
                ],
                defaultOption: { text: "Select", value: "" }
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
            },
            iman: {
                rules: [
                    {
                        name: Utils.validationType.required,
                        msg: "this is radio required"
                    }
                ],
            },
            matt: {
                rules: [
                    {
                        name: Utils.validationType.required,
                        msg: "this is checkbpox required"
                    }
                ],
            },
            groupIman:{
                rules: [
                    {
                        name: Utils.validationType.required,
                        msg: "this is group required"
                    }
                ],
            }
        }

        this.bonnieChange = this.bonnieChange.bind(this)
        this.tianChange = this.tianChange.bind(this)
    }

    handleChange(e, name) {
        let newOne = {};
        newOne[name] = e.target.value;
        this.setState(newOne)
    }

    bonnieChange(e) {
        console.log(e);
        alert("this is boonie call")
    }

    tianChange(e) {
        console.log(e);
        alert("this is tian call")
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
                    <div><label>Peter: <ReactText name="peter" ></ReactText></label></div>
                    <ReactText name="bonnie" onChange={this.bonnieChange}></ReactText>
                    <div>
                        <div>
                            <div>
                                <ReactSelect name="tian" selectConfig={this.state.selectConfig} onChange={this.tianChange}></ReactSelect>
                            </div>
                        </div>
                    </div>

                    <ReactGroup name="groupIman">
                        <ReactRadio group name="iman" value="test" />
                        <ReactRadio group name="iman" value="test1" />
                        <ReactRadio group name="iman" value="" />
                        <ReactCheckBox group type="radio" name="matt" value="peter" />
                        <ReactCheckBox group type="radio" name="tian" value="2222" />
                        {/* <div>
                        <div>
                            <ReactCheckBox type="radio" name="matt" value="peter" />

                        </div>
                    </div> */}
                    </ReactGroup>



                    <button type="submit" >Submit</button>
                </ReactForm>
            </div>

        );
    }
}

export default AddGoods;