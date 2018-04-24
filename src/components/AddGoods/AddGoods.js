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
            name: {
                rules: [
                    {
                        name: Utils.validationType.required,
                        msg: "name is required"
                    },
                    {
                        name: Utils.validationType.maxLength,
                        rule: 3,
                        msg: "name should be less than 3 digits"
                    }
                ],
                trigger: "blur"
            },
            price: {
                rules: [
                    {
                        name: Utils.validationType.required,
                        msg: "price is required"
                    },
                    {
                        name: Utils.validationType.maxLength,
                        rule: 3,
                        msg: "price should be less than 3 digits"
                    }
                ],
                trigger: "blur"
            },
            category: {
                rules: [
                    {
                        name: Utils.validationType.required,
                        msg: "category is required"
                    },
                    {
                        name: Utils.validationType.maxLength,
                        rule: 3,
                        msg: "category maxlength should less than 3 digits"
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
            <ReactForm formConfig={this.validationConfig} onSubmit={() => this.emitAdd.call(this)}>
            <div>
                <div>
                    <label>Name:<ReactText name="name" ></ReactText></label>
                </div>
                <div>
                    <label>categery:
                        <ReactSelect name="category" selectConfig={this.state.selectConfig} ></ReactSelect>
                    </label>
                </div>
                <div>
                    <label>Price:<ReactText name="price" ></ReactText>
                        </label>
                </div>
                {/* <button onClick={() => this.emitAdd.call(this)}>Add</button> */}
               
                    {/* <div><label>Peter: <ReactText name="peter" ></ReactText></label></div>
                    <ReactText name="bonnie"></ReactText>
                    <div>
                        <div>
                            <div>
                                <ReactSelect name="tian" selectConfig={this.state.selectConfig} ></ReactSelect>
                            </div>
                        </div>
                    </div> */}

                    {/* <ReactGroup name="groupIman">
                        <div>this is group</div>
                        <ReactRadio group name="iman1" value="test" />
                        <ReactRadio group name="iman2" value="test1" />
                        <ReactRadio group name="iman3" value="" />
                        <ReactCheckBox group type="radio" name="iman4" value="peter" />
                        <ReactCheckBox group type="radio" name="iman5" value="2222" />
                 

                        <div>this is end group</div>
                    
                    </ReactGroup> */}



                    <button type="submit" >Add</button>
                
            </div>
            </ReactForm>
        );
    }
}

export default AddGoods;