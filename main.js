
const s_box = require('./s_box');
const p_box = require('./p_box');

let box1 = new s_box();
let box2 = new s_box();
let box3 = new s_box();
box1.connect_output(box2);
box2.connect_output(box3);
box1.continuous_encrypt(2);

let box4 = new p_box();
let binary = box4.toBinary(12);
console.log(binary);
console.log(binary[2]);
