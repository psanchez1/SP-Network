const { remote, ipcRenderer } = require('electron');
let contextMenu = remote.getGlobal('ctxMenu');
let rightClickedElement = null;

document.addEventListener('contextmenu', (e) => {
    rightClickedElement = e.srcElement;
    if (rightClickedElement.getAttribute('data-type')) {
        contextMenu.popup(remote.getCurrentWindow());
        //console.log(rightClickedElement);
        //console.log(rightClickedElement.getAttribute('data-type'));
    }

});

ipcRenderer.on('getInfo', e =>{
    //console.log(boxes.get(rightClickedElement.id));
    displayBoxInfo(boxes.get(rightClickedElement.id));
});