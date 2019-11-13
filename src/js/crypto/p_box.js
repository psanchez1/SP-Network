const box = require('./box');
const {toBinary, arrayToString, toDecimal} = require('./functions');


//class for 16 bit permutation box
class p_box extends box {
    constructor(input) {
        super(input);
        this.type = 'p_box';
        this.size = 16;

        //create transposition rules
        this.mappings = new Map();
        let indices = [];
        for (let i = 0; i < 16; i++) {
            indices[i] = i;
        }

        //console.log("P Box:");

        for (let i = 0; i < 16; i++) {
            //console.log(indices);
            let rand_index = Math.floor(Math.random() * (indices.length));
            let rand_output = indices[rand_index];
            indices.splice(rand_index, 1);
            this.mappings.set(i, rand_output);
            //console.log(`${i} mapped to ${rand_output}`);
        }

        this.c_inputs = [];
        this.c_outputs = [];
    }

    encrypt() {
        //get inputs from connected inputs
        let input = '';
        for (let i = 0; i < this.c_inputs.length; i++) {
            //console.log(`p_box received ${this.c_inputs[i].output} as input`);
            input += toBinary(this.c_inputs[i].output);
        }
        //console.log(`Input: ${input}`);
        this.input = toDecimal(input);

        //swap bits according to mappings
        for (let i = 0; i < 16; i++) {
            let dest = this.mappings.get(i);
            //console.log(`Swapping indices: ${i} and ${dest}`);
            input = this.swap(i, dest, input);
        }
        input = arrayToString(input);
        this.outputs = [];
        let num1 = parseInt(input.substring(0, 4), 2);
        let num2 = parseInt(input.substring(4, 8), 2);
        let num3 = parseInt(input.substring(8, 12), 2);
        let num4 = parseInt(input.substring(12, 16), 2);
        this.outputs.push(num1);
        this.outputs.push(num2);
        this.outputs.push(num3);
        this.outputs.push(num4);
        this.output = toDecimal(input);
        //console.log(`Output: ${input}`);
        this.updated.dispatch();

        if(this.c_outputs.length === 1)
            this.c_outputs[0].setInput(this.output);
    }

    //helper function for swapping indices of array
    swap(x, y, arr) {
        if (x >= arr.length || y >= arr.length
            || x < 0 || y < 0) {
            throw new RangeError();
        }
        let newArr = null;
        if (typeof arr === "string")
            newArr = [...arr];
        else
            newArr = arr;
        let temp = newArr[y];
        newArr[y] = newArr[x];
        newArr[x] = temp;
        return newArr;
    }

    //p_box can connect to 4 s_boxes
    connect_input(input) {
        if (this.c_inputs.length >= 4)
            return;
        this.c_inputs.push(input);
    }

    connect_output(output) {
        if (this.c_outputs.length >= 4)
            return;
        this.c_outputs.push(output);
        output.connect_input(this);
    }

    reportMappings(){
        console.log('P-Box Mappings:');
        for(let k of this.mappings.keys()){
            console.log(`${k} mapped to ${this.mappings.get(k)}`);
        }
    }
}

module.exports = p_box;