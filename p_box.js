const box = require('./box');

class p_box extends box{
    constructor(){
        super();

        //create transposition rules
        this.mappings = new Map();
        let indices = [];
        for(let i = 0; i < 16; i++){
            indices[i] = i;
        }

        console.log("P Box:");

        for(let i = 0; i < 16; i++){
            //console.log(indices);
            let rand_index = Math.floor(Math.random() * (indices.length));
            let rand_output = indices[rand_index];
            indices.splice(rand_index, 1);
            this.mappings.set(i, rand_output);
            console.log(`${i} mapped to ${rand_output}`);
        }

        this.c_inputs = [];
        this.c_outputs = [];
    }

    encrypt(){
        //get inputs from connected inputs
        let input = '';
        for(let i = 0; i < this.c_inputs.length; i++){
            input += this.toBinary(this.c_inputs[i].output, false);
        }

        //swap bits according to mappings
        for(let i = 0; i < 16; i++){
            let dest = this.mappings.get(i);
            swap(i, dest, input);
        }

        this.outputs = [];
        let num1 = parseInt(input.substring(0, 4), 2);
        let num2 = parseInt(input.substring(4, 8), 2);
        let num3 = parseInt(input.substring(8, 12), 2);
        let num4 = parseInt(input.substring(12, 16), 2);
        this.outputs.push(num1);
        this.outputs.push(num2);
        this.outputs.push(num3);
        this.outputs.push(num4);
    }

    //helper function for swapping indices of array
    swap(x, y, arr){
        if(x >= arr.length || y >= arr.length
            || x < 0 || y < 0){
            throw new RangeError();
        }

        let temp = arr[y];
        arr[y] = arr[x];
        arr[x] = temp;
    }

    //p_box can connect to 4 s_boxes

    connect_input(input){
        if(this.c_inputs.length >= 4)
            return;
        this.c_inputs.push(input);
    }

    connect_output(output){
        if(this.c_outputs.length >= 4)
            return;
        this.c_outputs.push(output);
        output.connect_input(this);
    }

    toBinary(decimal, padding=true){
        let binary = (decimal >>> 0).toString(2);
        if(!padding)
            return binary;
        let paddingSize = 16 - binary.length;
        let paddingStr = '';
        for(let i = 0; i < paddingSize; i++){
            paddingStr = '0' + paddingStr;
        }
        return paddingStr + binary;
    }

}

module.exports = p_box;