const s_box = require('./s_box');
const p_box = require('./p_box');
const round_key = require('./round_key');
const {toBinary} = require('./functions');

console.log('Testing round_key:');
let key = new round_key(7);
key.setInput(12);
console.log('Round key with key=7 created, input=12');
console.log(`7 in binary ${toBinary(7)}`);
console.log(`12 in binary ${toBinary(12)}`);
key.encrypt();
console.log(`Result is ${key.output} or ${toBinary(key.output)}`);
key.output === 11 ? console.log('Test passed') : console.log('Test failed');