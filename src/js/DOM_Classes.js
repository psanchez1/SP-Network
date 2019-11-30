
class DOMBox {
    constructor(box, id) {
        this.box = box;
        this.id = id;
        this.handler = this.box.updated.add(this.updateValues, this);
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
        this.handler.detach();
        this.box = newBox;
        this.handler = this.box.updated.add(this.updateValues, this);
    }

    //add rows within container, used to create bit containers
    addContainerRow(container, idPrefix){
        let row = document.createElement('div');
        row.classList.add('row');
        container.appendChild(row);
        for(let i = 0; i < 16; i++){
            let bitContainer = document.createElement('div');
            bitContainer.classList.add('bitContainer');
            bitContainer.id = `${idPrefix}${i}`;
            bitContainer.classList.add(`${idPrefix}${i}`);
            row.appendChild(bitContainer);
        }
    }
};

class DOM_round_key extends DOMBox {
    constructor(round_key, id) {
        super(round_key, id);
        let element = this.element;
        //keyText.value = this.box.key;
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
        //rectangle.innerHTML = `<h3>XOR with Key: ${toBinary(this.box.key, true, this.box.size)}</h3>`;

        this.addContainerRow(rectangle, 'i');
        this.addContainerRow(rectangle, 'k');

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
        let rectangle = document.querySelector(`#${this.id} .rectangle`);
        //rectangle.innerHTML = `<h3>XOR with Key: ${toBinary(this.box.key, true, this.box.size)}</h3>`;
        let b_key = toBinary(this.box.key, true, this.box.size);
        for(let i = 0; i < 16; i++){
            document.querySelector(`#${this.element.id} .i${i}`).innerText = b_input[i];
            document.querySelector(`#${this.element.id} .k${i}`).innerText = b_key[i];
        }
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
        else {
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

        this.addContainerRow(rectangle, 'i'); //add row for input bits
        this.addContainerRow(rectangle, 'o'); //add row for output bits

        element.appendChild(rectangle);
        let output_label = document.createElement('H3');
        output_label.setAttribute('data-type', 'p_box');
        output_label.classList.add('output');
        output_label.innerText = 'Output';
        element.appendChild(output_label);
        //this.box.updated.add(this.updateValues, this);
    }

    updateValues(){
        super.updateValues();
        let b_input = toBinary(this.box.input, true, this.box.size);
        for(let i = 0; i < 16; i++){
            //document.getElementById(`i${i}`).innerText = b_input[i];
            document.querySelector(`#${this.element.id} .i${i}`).innerText = b_input[i];
        }
        let o_output = toBinary(this.box.output, true, this.box.size);
        for(let i = 0; i < 16; i++){
            //document.getElementById(`o${i}`).innerText = o_output[i];
            document.querySelector(`#${this.element.id} .o${i}`).innerText = o_output[i];
        }

        /*
        //draw lines
        for (let i = 0; i < 16; i++){
            let input = document.querySelector(`#${this.element.id} .i${i}`);
            let oNum = this.box.mappings.get(i);
            let output = document.querySelector(`#${this.element.id} .o${oNum}`);
            createLine(input, output);
        }
        */
    }
}