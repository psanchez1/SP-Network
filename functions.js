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

module.exports = {toBinary};