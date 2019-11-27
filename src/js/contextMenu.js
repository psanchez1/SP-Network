const { remote, ipcRenderer } = require('electron');
const contextMenu = remote.getGlobal('ctxMenu');
const pBoxMenu = remote.getGlobal('pBoxMenu');
let rightClickedElement = null;

document.addEventListener('contextmenu', (e) => {
    rightClickedElement = e.srcElement;
    if (rightClickedElement.getAttribute('data-type')) {
        if (rightClickedElement.getAttribute('data-type') === 'p_box')
            pBoxMenu.popup(remote.getCurrentWindow());
        else
            contextMenu.popup(remote.getCurrentWindow());
    }
});

ipcRenderer.on('getInfo', e => {
    //console.log(boxes.get(rightClickedElement.id));
    displayBoxInfo(boxes.get(rightClickedElement.id));
});

ipcRenderer.on('closerLook', e =>{
    
});