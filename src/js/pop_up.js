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


function togglePopUp(){
    var popUp = document.getElementById("popUp01");
    if (popUp.style.display != "block")
        popUp.style.display = "block";
    else
        popUp.style.display = "none";
    closeNav();
}

function displayBoxInfo(box){
    let popUp = document.getElementById('popUp01');
    document.getElementById('popUpTitle').innerText = box.type;
    let text = `Size: ${box.size} bits`;
    if(box.mappings){
        text += `\nMappings:\n`;
        for(let k of box.mappings.keys()){
            text += `${k} -> ${box.mappings.get(k)}\n`;
        }
    }
    if(box.type === 'round_key'){
        text += `\nKey: ${box.key}\n`;
    }
    document.getElementById('popUpText').innerText = text;
    popUp.style.display = "block";
   }

function customAlert(alert){
    document.getElementById('modName').innerText = alert;
    document.getElementById('statsList').innerText = "";
    togglePopUp();
    }

async function customToast(message){
    return new Promise((resolve, reject) => {
        let toast = document.getElementById('toastMessage');
        toast.innerHTML = message;
        openOverlay();
        setTimeout(resolve, 4100);
    });
    
}

function toggleOverlay(){
    var overlay = document.getElementById('overlay');
    overlay.style.display == "block"? overlay.style.display = "none": overlay.style.display = "block";
}

function openOverlay(){
    var overlay = document.getElementById('overlay');
    overlay.style.display = "block";
    setTimeout(closeOverlay, 4000);
}

function closeOverlay(){
    var overlay = document.getElementById('overlay');
    overlay.style.display = "none";
}
