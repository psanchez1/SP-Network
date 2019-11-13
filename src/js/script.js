const s_box = require('./js/crypto/s_box.js');
const p_box = require('./js/crypto/p_box.js');
const round_key = require('./js/crypto/round_key.js');
const { toBinary } = require('./js/crypto/functions.js');

const content = document.getElementById('content');
let boxes = new Map();

//create crypto objects
let key1 = new round_key(1560);
boxes.set('k1', key1);
key1.setInput(22);
let box1 = new s_box(2);
boxes.set('s1', box1);
let box2 = new s_box(2);
boxes.set('s2', box2);
let box3 = new s_box(2);
boxes.set('s3', box3);
let box4 = new s_box(2);
boxes.set('s4', box4);
key1.connect_output(box1);
key1.connect_output(box2);
key1.connect_output(box3);
key1.connect_output(box4);
let p1 = new p_box();
boxes.set('p1', p1);
box1.connect_output(p1);
box2.connect_output(p1);
box3.connect_output(p1);
box4.connect_output(p1);
let key2 = new round_key(1560);
boxes.set('k2', key2);
key2.setInput(22);
p1.connect_output(key2);

//create DOM objects for row 1
let row1 = createRow();
let DOM_key1 = new DOM_round_key(key1, 'k1');
row1.appendChild(DOM_key1.element);

//create DOM objects for row 2
let row2 = createRow();
let DOM_s1 = new DOM_s_box(box1, 's1');
row2.appendChild(DOM_s1.element);
let DOM_s2 = new DOM_s_box(box2, 's2');
row2.appendChild(DOM_s2.element);
let DOM_s3 = new DOM_s_box(box3, 's3');
row2.appendChild(DOM_s3.element);
let DOM_s4 = new DOM_s_box(box4, 's4');
row2.appendChild(DOM_s4.element);

//create DOM objects for row 3
let row3 = createRow();
let DOM_p1 = new DOM_p_box(p1, 'p1');
row3.appendChild(DOM_p1.element);

//create DOM objects for row4
let row4 = createRow();
let DOM_key2 = new DOM_round_key(key2, 'k2');
row4.appendChild(DOM_key2.element);

function reset() {
    key1 = new round_key(1560);
    key1.setInput(22);
    box1 = new s_box(2);
    box2 = new s_box(2);
    box3 = new s_box(2);
    box4 = new s_box(2);
    key1.connect_output(box1);
    key1.connect_output(box2);
    key1.connect_output(box3);
    key1.connect_output(box4);
}

function start() {
    let textbox = document.getElementById('textBox1');
    if (textbox.value) {
        console.log(`TextBox value: ${textbox.value}`);
        let key = parseInt(textbox.value);
        key1 = new round_key(1560);
        key1.setInput(key);
        resetBindings();
    }

    key1.continuous_encrypt();
}

function resetBindings() {
    boxes.set('k1', key1);
    boxes.set('s1', box1);
    boxes.set('s2', box2);
    boxes.set('s3', box3);
    boxes.set('s4', box4);
    boxes.set('p1', p1);
    DOM_key1.changeBox(key1);
    DOM_s1.changeBox(box1);
    DOM_s2.changeBox(box2);
    DOM_s3.changeBox(box3);
    DOM_s4.changeBox(box4);
    DOM_p1.changeBox(p1);
    DOM_key2.changeBox(key2);
    key1.connect_output(box1);
    key1.connect_output(box2);
    key1.connect_output(box3);
    key1.connect_output(box4);
    box1.connect_output(p1);
    box2.connect_output(p1);
    box3.connect_output(p1);
    box4.connect_output(p1);
    p1.connect_output(key2);
}

//return new DOM row div element
function createRow() {
    let row = document.createElement('DIV');
    row.classList.add('row');
    content.appendChild(row);
    return row;
}