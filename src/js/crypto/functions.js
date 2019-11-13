//convert a decimal number to a (string representation) binary number
function toBinary(decimal, padding = true, binarySize = 4) {
    let binary = (decimal >>> 0).toString(2);
    if (!padding)
        return binary;
    let paddingSize = binarySize - binary.length;
    let paddingStr = '';
    for (let i = 0; i < paddingSize; i++) {
        paddingStr = '0' + paddingStr;
    }
    return paddingStr + binary;
}

//convert binary string to decimal number
function toDecimal(str){
    return parseInt(str, 2);
}

//convert array of characters to string
function arrayToString(arr) {
    return arr.join('');
}

module.exports = { toBinary, arrayToString, toDecimal };