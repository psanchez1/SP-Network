const s_box = require('./src/js/crypto/s_box');
const p_box = require('./src/js/crypto/p_box');
const round_key = require('./src/js/crypto/round_key');
const {toBinary} = require('./src/js/crypto/functions');

let key = new round_key(7);
key.setInput(12);
let sBoxes = [];
let perm_box = new p_box();
for(let i = 0; i < 4; i++){
    sBoxes[i] = new s_box();
    key.connect_output(sBoxes[i]);
    sBoxes[i].connect_output(perm_box);
}

    
console.log(key);


console.log('Testing round_key:');
console.log('Round key with key=7 created, input=12');
console.log(`7 in binary ${toBinary(7)}`);
console.log(`12 in binary ${toBinary(12)}`);
key.continuous_encrypt();
console.log(`Result is ${key.output} or ${toBinary(key.output)}`);
key.output === 11 ? console.log('Test passed') : console.log('Test failed');
