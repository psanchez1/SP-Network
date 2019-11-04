
class round_key {
    constructor(key) {
        this.key = key;
        this.type = 'round_key';
    }

    //TODO: validate input, must be number
    setInput(input) {
        this.input = input;
    }

    encrypt() {
        //xor input with key
        this.output = this.input ^ this.key;
    }

    //TODO: set up outbound connections to s_boxes

}

module.exports = round_key;