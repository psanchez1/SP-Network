const s_box = require('./js/crypto/s_box.js');
const p_box = require('./js/crypto/p_box.js');
const round_key = require('./js/crypto/round_key.js');
const { toBinary } = require('./js/crypto/functions.js');

const content = document.getElementById('content');
const colorScheme = ['green', 'yellow', 'red', 'cyan'];
let boxes = new Map();

//checkboxes
let globalBinary = false;
let globalDecimal = true;
const decimalCheck = document.getElementById('DecimalCheck');
const binaryCheck = document.getElementById('BinaryCheck');

//textboxes
let textbox = document.getElementById('textBox1');
let keyText = document.getElementById('keyText');

function toggleBinary() {
    globalDecimal = globalBinary;
    globalBinary = !globalBinary;
    decimalCheck.checked = globalDecimal;
}

function toggleDecimal() {
    globalBinary = globalDecimal;
    globalDecimal = !globalDecimal;
    binaryCheck.checked = globalBinary;
}

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
p1.connect_output(key2);

//create DOM objects for row 1
let row1 = createRow();
let DOM_key1 = new DOM_round_key(key1, 'k1');
row1.appendChild(DOM_key1.element);

//create DOM objects for row 2
let row2 = createRow();
let DOM_s1 = new DOM_s_box(box1, 's1', colorScheme[0]);
row2.appendChild(DOM_s1.element);
let DOM_s2 = new DOM_s_box(box2, 's2', colorScheme[1]);
row2.appendChild(DOM_s2.element);
let DOM_s3 = new DOM_s_box(box3, 's3', colorScheme[2]);
row2.appendChild(DOM_s3.element);
let DOM_s4 = new DOM_s_box(box4, 's4', colorScheme[3]);
row2.appendChild(DOM_s4.element);

//create DOM objects for row 3
let row3 = createRow();
let DOM_p1 = new DOM_p_box(p1, 'p1');
row3.appendChild(DOM_p1.element);

//create DOM objects for row4
let row4 = createRow();
let DOM_key2 = new DOM_round_key(key2, 'k2');
row4.appendChild(DOM_key2.element);

console.log('DOM Key2:');
console.log(DOM_key2);

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

function validateInput(text){
    if(text === '')
        return true;
    
    for(let i = 0; i < text.length; i++){
        if(globalBinary && text[i] !== '1' && text[i] !== '0')
            return false;
        
        if(isNaN(text[i]))
            return false;
    }
    return true;
}

function start() {
    //default values
    let value = 22;
    let key_value = 1560;
    if(!validateInput(textbox.value) || !validateInput(keyText.value)){
        customAlert('Incorrect input');
        return;
    }

    if (textbox.value){
        value = globalBinary ? parseInt(textbox.value, 2) : parseInt(textbox.value);
    }
        
    if (keyText.value){
        key_value = globalBinary ? parseInt(keyText.value, 2) : parseInt(keyText.value);
    }
        



    if (textbox.value || keyText.value) {
        key1 = new round_key(key_value);
        key1.setInput(value);
        key2 = new round_key(key_value);
        resetBindings();
    }

    key1.continuous_encrypt();

}

//TODO: fix here, key2 DOM is not updating correctly
function resetBindings() {
    boxes.set('k1', key1);
    boxes.set('k2', key2);
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

