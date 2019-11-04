
const s_box = require('./s_box');
const p_box = require('./p_box');
const round_key = require('./round_key');

let box1 = new s_box(12);
let box2 = new s_box(12);
let box3 = new s_box(12);
let box4 = new s_box(12);
box1.connect_sibling(box2);
box2.connect_sibling(box3);
box3.connect_sibling(box4);
let box5 = new p_box();
box1.connect_output(box5);
box2.connect_output(box5);
box3.connect_output(box5);
box4.connect_output(box5);
box1.continuous_encrypt();
