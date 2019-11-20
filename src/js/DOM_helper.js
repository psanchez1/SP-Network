//helper function returns span element with specified colored text
function colorSpan(color, text) {
    let span = document.createElement('SPAN');
    span.style.color = color;
    span.innerText = text;
    return span;
}

//color a 16-bit binary number in 4-bit groups
function colorBinary(binary) {

}

String.prototype.splice = (start, newSubStr) => {
    return this.slice(0, start) + newSubStr + this.slice(start);
}

//returns binary string seperated in 4-bit groups
function splitBinary(binary) {
    let r_value = binary.splice(4, ' ');
    r_value = r_value.splice(9, ' ');
    r_value = r_value.splice(14, ' ');
    return r_value;
}