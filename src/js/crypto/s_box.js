const box = require('./box');
//class for a 4-bit substitution box 
class s_box extends box {

    constructor(input) {
        super(input);
        this.type = 's_box';
        this.size = 4;

        let numbers = [];
        for(let i = 0; i < 16; i++){
            numbers.push(i);
        }

        //create substitution rules for 0 to 15
        this.mappings = new Map();
        for (let i = 0; i < 16; i++) {
            let rand_index = Math.floor((Math.random() * numbers.length));
            let rand_num = numbers[rand_index];
            numbers.splice(rand_index, 1);
            this.mappings.set(i, rand_num);

            //console.log(`${i} mapped to ${rand_num}`);
        }
    };

    encrypt(input) {
        if (input)
            this.input = input;
        this.output = this.mappings.get(this.input);
        console.log(`Encrypt results: ${this.input} mapped to ${this.output}`);
        this.updated.dispatch();
    }

    reportMappings(){
        console.log('S-Box Mappings: ');
        for(let k of this.mappings.keys()){
            console.log(`${k} mapped to ${this.mappings.get(k)}`);
        }
    }
};

module.exports = s_box;