const Signal = require('mini-signals');

//generic box class
class box {

    constructor(input) {
        if(input)
            this.input = input;
        this.updated = new Signal(); //raised when important values of class are changed
    }

    setInput(input){
        this.input = input;
        this.updated.dispatch();
    }

    /* encrypt function must be defined in subclasses */

    //continues encryption in connected boxes
    continuous_encrypt(input) {
        if(input)
            this.input = input;
        this.encrypt(this.input);
        if (this.nextSibling) {
            this.nextSibling.continuous_encrypt();
        }
        else if (this.c_output) {
            this.c_output.continuous_encrypt(this.output);
        }
        else if(this.c_outputs.length === 1)
            this.c_outputs[0].continuous_encrypt(this.output);
    }

    connect_input(c_input) {
        this.c_input = c_input;
    }

    //connect this box's output to another's input
    connect_output(c_output) {
        this.c_output = c_output;
        this.c_output.connect_input(this);
    }

    //save reference to parallel boxes
    connect_sibling(sibling) {
        this.nextSibling = sibling;
    }
}

module.exports = box;