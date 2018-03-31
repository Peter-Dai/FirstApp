export default {
    requiredValidator,
    maxLengthValidator,
}


function requiredValidator(value){
    return !value
}

function maxLengthValidator(value,max){
    return value.length > max
}