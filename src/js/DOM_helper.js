//const svg = content.appendChild(document.createElement('SVG'));
const svg = document.querySelector('svg');

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

//return new DOM row div element
function createRow() {
    let row = document.createElement('DIV');
    row.classList.add('row');
    content.appendChild(row);
    return row;
}

//create an svg line from element1 to element2
function createLine(element1, element2) {
    let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    let x1 = getOffset(element1).left + (getWidth(element1) / 2);
    let y1 = getOffset(element1).top + (getHeight(element1));
    let x2 = getOffset(element2).left + (getWidth(element2) / 2);
    //let y2 = getOffset(element2).top + (getHeight(element2) / 4);
    let y2 = getOffset(element2).top;
    line.setAttributeNS(null, 'x1', x1);
    line.setAttributeNS(null, 'y1', y1);
    line.setAttributeNS(null, 'x2', x2);
    line.setAttributeNS(null, 'y2', y2);
    svg.appendChild(line);
    console.log(line);
}

function clearLines(){
    svg.innerHTML = "";
}

function getOffset(element) {
    let rect = element.getBoundingClientRect();
    let offset = {
        top: rect.top + document.body.scrollTop,
        left: rect.left + document.body.scrollLeft
    };
    return offset;
}

function getHeight(element){
    return parseFloat(getComputedStyle(element, null).height.replace("px", ""))
}

function getWidth(element){
    return parseFloat(getComputedStyle(element, null).width.replace("px", ""))
}