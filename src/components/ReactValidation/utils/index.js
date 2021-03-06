import Validator from "../validator"


function showErrMsg(ele, errMsg) {
    if (!ele)
        throw "no element";
    if (document.getElementsByClassName(ele.getAttribute("name") + "_err").length != 0)
        return;
    let errDom = document.createElement("div");
    errDom.className = ele.getAttribute("name") + "_err";
    errDom.style = "color:red";
    errDom.innerText = errMsg;
    ele.after(errDom)
}

function removeErrMsg(ele) {
    if (!ele)
        throw "no element";
    document.querySelectorAll("." + ele.getAttribute("name") + "_err").forEach(function (a) {
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

function retrieveDomValue(targetDom) {
    return ['radio', 'checkbox'].indexOf(targetDom.type) > -1 ? targetDom.checked ? targetDom.value : '' : targetDom.value;
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
    },
    validateRule: (validationConfig, targetDom, messageDom) => {
        const { rules } = validationConfig;
        // let isVaild = true;
        let error = null;

        let value = ['radio', 'checkbox'].indexOf(targetDom.type) > -1 ? targetDom.checked : targetDom.value;
        // foreach rules of validaiton config and validate each rules, but once meet one failed will exit remaining validation
        for (let i of rules) {
            if (executeValidation(i, value)) {
                showErrMsg(messageDom, i.msg)
                // isVaild = false;
                error = {
                    name: i.name,
                    msg: i.msg
                }
                break;
            }
        }

        return error;
    }
}

export default {
    // function
    showErrMsg,
    removeErrMsg,
    executeValidation,
    retrieveDomValue,

    // const
    validationType,
    validationHelper,
};


