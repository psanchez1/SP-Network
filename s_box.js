const box = require('./box');
//class for a 4-bit substitution box 
class s_box extends box{

    constructor(){
        super();

        //create substitution rules for 0 to 15
        this.mappings = new Map();
        for(let i = 0; i < 16; i++){
            let rand_num = Math.floor((Math.random() * 16));
            this.mappings.set(i, rand_num);

            /*
            let debug = `${i} mapped to ${rand_num}`;
            console.log(debug);
            */
        }
    };

    encrypt(input){
        this.input = input;
        this.output = this.mappings.get(input);
        let debug = `${input} mapped to ${this.output}`;
        console.log(debug);
    }


};

module.exports = s_box;