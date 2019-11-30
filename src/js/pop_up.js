function toggleAbout() {
    var about = document.getElementById("about");
    if (about.style.display != "block") {
        about.style.display = "block";
    }
    else {
        about.style.display = "none";
    }

    closeNav();
}

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}


function togglePopUp() {
    var popUp = document.getElementById("popUp01");
    if (popUp.style.display != "block")
        popUp.style.display = "block";
    else {
        let body = document.querySelector('#popUp01 .textContainer');
        let oldRow = document.querySelector('#popUp01 .textContainer .pad-row');
        if (oldRow)
            body.removeChild(oldRow);
        popUp.style.display = "none";
        clearLines();
    }

    closeNav();
}

function displayBoxInfo(box) {
    let popUp = document.getElementById('popUp01');
    document.getElementById('popUpTitle').innerText = box.type;
    let text = `Size: ${box.size} bits`;
    if (box.mappings) {
        text += `\nMappings:\n`;
        for (let k of box.mappings.keys()) {
            text += `${k} -> ${box.mappings.get(k)}\n`;
        }
    }
    if (box.type === 'round_key') {
        text += `\nKey: ${box.key} or ${toBinary(box.key, true, box.size)}\n`;
    }
    document.getElementById('popUpText').innerText = text;
    popUp.style.display = "block";
}

function displayPBox(box) {
    let popUp = document.getElementById('popUp01');
    document.getElementById('popUpTitle').innerText = box.type;
    let body = document.querySelector('#popUp01 .textContainer');
    let oldRow = document.querySelector('#popUp01 .textContainer .pad-row');
    if (oldRow)
        body.removeChild(oldRow);
    let button = document.querySelector('#popUp01 .textContainer input');
    let row = document.createElement('DIV');
    body.insertBefore(row, button);
    row.classList.add('pad-row');
    let rectangle = row.appendChild(document.createElement('DIV'));
    rectangle.classList.add('rectangle-no-border');
    addContainerRow(rectangle, 'i');
    let outRow = addContainerRow(rectangle, 'o');
    let b_input = toBinary(box.input, true, box.size);
    let b_output = toBinary(box.output, true, box.size);
    for (let i = 0; i < 16; i++) {
        rectangle.querySelector(`.i${i}`).innerText = b_input[i];
        rectangle.querySelector(`.o${i}`).innerText = b_output[i];
    }
    outRow.style.visibility = 'hidden';
    document.getElementById('popUpText').innerText = '';
    popUp.style.display = "block";
    setTimeout(drawLines, 1000, box, rectangle);
    setTimeout(function(){
        outRow.style.visibility = 'visible';
    }, 1500);
}

//add rows within container, used to create bit containers
function addContainerRow(container, idPrefix) {
    let row = document.createElement('div');
    row.classList.add('pad-row');
    container.appendChild(row);
    for (let i = 0; i < 16; i++) {
        let bitContainer = document.createElement('div');
        bitContainer.classList.add('bigBitContainer');
        bitContainer.id = `${idPrefix}${i}`;
        bitContainer.classList.add(`${idPrefix}${i}`);
        row.appendChild(bitContainer);
    }
    return row;
}

function drawLines(box, rectangle) {
    for (let i = 0; i < 16; i++) {
        let input = rectangle.querySelector(`.i${i}`);
        let oNum = box.mappings.get(i);
        let output = rectangle.querySelector(`.o${oNum}`);
        createLine(input, output);
    }
}

function customAlert(alert) {
    document.getElementById('modName').innerText = alert;
    document.getElementById('statsList').innerText = "";
    togglePopUp();
}

async function customToast(message) {
    return new Promise((resolve, reject) => {
        let toast = document.getElementById('toastMessage');
        toast.innerHTML = message;
        openOverlay();
        setTimeout(resolve, 4100);
    });

}

function toggleOverlay() {
    var overlay = document.getElementById('overlay');
    overlay.style.display == "block" ? overlay.style.display = "none" : overlay.style.display = "block";
}

function openOverlay() {
    var overlay = document.getElementById('overlay');
    overlay.style.display = "block";
    setTimeout(closeOverlay, 4000);
}

function closeOverlay() {
    var overlay = document.getElementById('overlay');
    overlay.style.display = "none";
}
