const {toBinary} = require('./functions');

//class for 16 bit round key
class round_key {
    constructor(key) {
        this.key = key;
        this.type = 'round_key';
        this.c_inputs = [];
        this.c_outputs = [];
    }

    //TODO: validate input, must be number
    setInput(input) {
        this.input = input;
    }

    encrypt() {
        //xor input with key
        this.output = this.input ^ this.key;
        let xored = toBinary(this.input ^ this.key);
    }

    //TODO: set up outbound connections to s_boxes
    connect_output(output){
        if (this.c_outputs.length >= 4)
            return;
        this.c_outputs.push(output);
        output.connect_input(this);
    }
    
}

module.exports = round_key;