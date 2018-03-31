import Validator from "../validator"


function showErrMsg(ele, errMsg) {
    if (!ele)
        throw "no element";
    if (document.getElementsByClassName(ele.name + "_err").length != 0)
        return;
    let errDom = document.createElement("div");
    errDom.className = ele.name + "_err";
    errDom.style = "color:red";
    errDom.innerText = errMsg;
    ele.after(errDom)
}

function removeErrMsg(ele) {
    if (!ele)
        throw "no element";
    document.querySelectorAll("." + ele.name + "_err").forEach(function (a) {
        a.remove()
    })

}

function executeValidation(rule, val) {
    switch (rule.name) {
        case validationType.required:
            return Validator.requiredValidator(val);
        case validationType.maxLength:
            return Validator.maxLengthValidator(val, rule.rule);
        default:
            return Validator.requiredValidator(val);
    }
}

const validationType = {
    required: "required",
    maxLength: "maxLength",
    partten: "partten",
    custom: "custom"
}

const validationHelper = {
    getValidationConfig: (e, configs) => {
        var name = e.target.name;
        return configs[name];
    }
}

export default {
    // function
    showErrMsg,
    removeErrMsg,
    executeValidation,

    // const
    validationType,
    validationHelper,
};


