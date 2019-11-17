
//helper function returns span element with specified colored text
function colorSpan(color, text) {
    let span = document.createElement('SPAN');
    span.style.color = color;
    span.innerText = text;
    return span;
}

class DOMBox {
    constructor(box, id) {
        this.box = box;
        this.id = id;
        this.box.updated.add(this.updateValues, this);
        this.element = document.createElement('DIV');
        this.element.setAttribute('data-id', this.id); //maybe remove, unnecessary
    }

    updateValues() {
        console.log(this.element);
        let input = this.box.input;
        let output = this.box.output;
        this.element.firstElementChild.innerText = input + '\n' + toBinary(input, true, this.box.size);
        this.element.lastElementChild.innerText = output + '\n' + toBinary(output, true, this.box.size);
    }

    changeBox(newBox) {
        this.box = newBox;
        this.box.updated.add(this.updateValues, this);
    }
};

class DOM_round_key extends DOMBox {
    constructor(round_key, id) {
        super(round_key, id);
        let element = this.element;
        element.classList.add('w-container');
        element.id = id;
        element.setAttribute('data-type', 'round_key');
        let input_label = document.createElement('H3');
        input_label.setAttribute('data-type', 'round_key');
        input_label.classList.add('input');
        input_label.innerText = 'Input';
        element.appendChild(input_label);
        let rectangle = document.createElement('DIV');
        rectangle.setAttribute('data-type', 'round_key');
        rectangle.classList.add('rectangle');
        rectangle.innerHTML = `<h3>XOR with Key: ${toBinary(this.box.key, true, this.box.size)}</h3>`;
        element.appendChild(rectangle);
        let output_label = document.createElement('H3');
        output_label.setAttribute('data-type', 'round_key');
        output_label.classList.add('output');
        output_label.innerText = 'Output';
        element.appendChild(output_label);
        this.element = element;
        //this.box.updated.add(this.updateValues, this);
    }

    updateValues() {
        console.log(this.element);
        let input = this.box.input;
        let output = this.box.output;
        let b_input = toBinary(input, true, this.box.size);
        let b_output = toBinary(output, true, this.box.size);
        let first = b_input.substring(0, 4);
        let second = b_input.substring(4, 8);
        let third = b_input.substring(8, 12);
        let fourth = b_input.substring(12, 16);
        this.element.firstElementChild.innerText = input + '\n';
        this.element.firstElementChild.appendChild(colorSpan(colorScheme[0], first + ' '));
        this.element.firstElementChild.appendChild(colorSpan(colorScheme[1], second + ' '));
        this.element.firstElementChild.appendChild(colorSpan(colorScheme[2], third + ' '));
        this.element.firstElementChild.appendChild(colorSpan(colorScheme[3], fourth));
        this.element.lastElementChild.innerText = output + '\n';
        first = b_output.substring(0, 4);
        second = b_output.substring(4, 8);
        third = b_output.substring(8, 12);
        fourth = b_output.substring(12, 16);
        this.element.lastElementChild.appendChild(colorSpan(colorScheme[0], first + ' '));
        this.element.lastElementChild.appendChild(colorSpan(colorScheme[1], second + ' '));
        this.element.lastElementChild.appendChild(colorSpan(colorScheme[2], third + ' '));
        this.element.lastElementChild.appendChild(colorSpan(colorScheme[3], fourth + ' '));

    }
}

class DOM_s_box extends DOMBox {
    constructor(s_box, id, color) {
        super(s_box, id);
        if (color)
            this.color = color;
        let element = this.element;
        element.classList.add('container');
        element.id = id;
        element.setAttribute('data-type', 's_box');
        let input_label = document.createElement('H3');
        input_label.setAttribute('data-type', 's_box');
        input_label.classList.add('input');
        input_label.innerText = 'Input';
        element.appendChild(input_label);
        let box = document.createElement('DIV');
        box.setAttribute('data-type', 's_box');
        box.classList.add('box');
        box.innerHTML = '<h3>S-Box</h3>';
        element.appendChild(box);
        let output_label = document.createElement('H3');
        output_label.setAttribute('data-type', 's_box');
        output_label.classList.add('output');
        output_label.innerText = 'Output';
        element.appendChild(output_label);
        this.element = element;
        //this.box.updated.add(this.updateValues, this);
    }

    updateValues() {
        if (this.color) {
            console.log(this.element);
            let input = this.box.input;
            let output = this.box.output;
            this.element.firstElementChild.innerText = input + '\n';
            this.element.firstElementChild.appendChild(colorSpan(this.color, toBinary(input, true, this.box.size)));
            this.element.lastElementChild.innerText = output + '\n';
            this.element.lastElementChild.appendChild(colorSpan(this.color, toBinary(output, true, this.box.size)));
        }
        else{
            super.updateValues();
        }
    }
}

class DOM_p_box extends DOMBox {
    constructor(p_box, id) {
        super(p_box, id);
        let element = this.element;
        element.classList.add('w-container');
        element.id = id;
        element.setAttribute('data-type', 'p_box');
        let input_label = document.createElement('H3');
        input_label.setAttribute('data-type', 'p_box');
        input_label.classList.add('input');
        input_label.innerText = 'Input';
        element.appendChild(input_label);
        let rectangle = document.createElement('DIV');
        rectangle.setAttribute('data-type', 'p_box');
        rectangle.classList.add('rectangle');
        element.appendChild(rectangle);
        let output_label = document.createElement('H3');
        output_label.setAttribute('data-type', 'p_box');
        output_label.classList.add('output');
        output_label.innerText = 'Output';
        element.appendChild(output_label);
        //this.box.updated.add(this.updateValues, this);
    }
}