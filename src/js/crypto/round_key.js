const { toBinary } = require('./functions');
const Signal = require('mini-signals');

//class for 16 bit round key
class round_key {
    constructor(key) {
        this.key = key;
        this.type = 'round_key';
        this.size = 16;
        this.c_inputs = [];
        this.c_outputs = [];
        this.updated = new Signal();
    }

    setInput(input) {
        this.input = input;
        this.updated.dispatch();
    }

    connect_input(c_input) {
        this.c_input = c_input;
    }

    continuous_encrypt() {
        console.log('key continuous encrypt called');
        this.encrypt();
        if(this.c_outputs.length >= 4){
            for(let i = 0; i < 3; i++){
                this.c_outputs[i].nextSibling = this.c_outputs[i+1];
            }
            this.c_outputs[0].continuous_encrypt();
        }
    }

    encrypt() {
        //xor input with key
        console.log(`${this.type} encrypting`);
        this.output = this.input ^ this.key;
        let xored = toBinary(this.input ^ this.key, true, 16);
        this.outputs = [];
        let num1 = parseInt(xored.substring(0, 4), 2);
        let num2 = parseInt(xored.substring(4, 8), 2);
        let num3 = parseInt(xored.substring(8, 12), 2);
        let num4 = parseInt(xored.substring(12, 16), 2);
        this.outputs.push(num1);
        this.outputs.push(num2);
        this.outputs.push(num3);
        this.outputs.push(num4);

        if (this.c_outputs.length > 3) {
            this.c_outputs[0].input = num1;
            this.c_outputs[1].input = num2;
            this.c_outputs[2].input = num3;
            this.c_outputs[3].input = num4;
        }


        for (let number of this.outputs) {
            console.log(`Output: ${number}`);
        }
        this.updated.dispatch();
    }

    connect_output(output) {
        if (this.c_outputs.length >= 4)
            return;
        this.c_outputs.push(output);
        output.connect_input(this);
    }

}

module.exports = round_key;