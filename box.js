
//generic box class
class box {

    constructor(input) {
        this.input = input;
    }

    /* encrypt function must be defined in subclasses */

    //continues encryption in connected boxes
    continuous_encrypt(input) {
        this.encrypt(this.input);
        if (this.nextSibling) {
            this.nextSibling.continuous_encrypt(); //change this to not depend on input?
        }
        else if (this.c_output) {
            this.c_output.continuous_encrypt(this.output);
        }
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