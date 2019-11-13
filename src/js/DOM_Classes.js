
class DOMBox {
    constructor(box, id){
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

    changeBox(newBox){
        this.box = newBox;
        this.box.updated.add(this.updateValues, this);
    }
};

class DOM_round_key extends DOMBox{
    constructor(round_key, id){
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
        element.appendChild(rectangle);
        let output_label = document.createElement('H3');
        output_label.setAttribute('data-type', 'round_key');
        output_label.classList.add('output');
        output_label.innerText = 'Output';
        element.appendChild(output_label);
        this.element = element;
        //this.box.updated.add(this.updateValues, this);
    }
}

class DOM_s_box extends DOMBox{
    constructor(s_box, id){
        super(s_box, id);
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
        element.appendChild(box);
        let output_label = document.createElement('H3');
        output_label.setAttribute('data-type', 's_box');
        output_label.classList.add('output');
        output_label.innerText = 'Output';
        element.appendChild(output_label);
        this.element = element;
        //this.box.updated.add(this.updateValues, this);
    }
}

class DOM_p_box extends DOMBox{
    constructor(p_box, id){
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