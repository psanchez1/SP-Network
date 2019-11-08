const electron = require('electron');
const url = require('url');
const path = require('path');
const fs = require('fs');
const readline = require('readline');
const MenuItem = electron.MenuItem;
const spawn = require('child_process').spawn;
const os = require("os");
const homedir = require('os').homedir();
var selectedUrl = '';
var selectedElement;


const {app, BrowserWindow, Menu, ipcMain, shell, globalShortcut} = electron;

let mainWindow;

const ctxMenu = new Menu();
global.ctxMenu = ctxMenu;

app.on('ready', function(){

    //keyboard shortcuts
    globalShortcut.register('CommandOrControl+M', () => {
        mainWindow.minimize();
    });

    globalShortcut.register('Home', () => {
        mainWindow.webContents.send('Home');
    });
    

    //create new window
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        //for custom translucent title bar, note resizing does not work atm
        frame: true
    });
    //load html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'src/index.html'),
        protocol: 'file:',
        slashes: true
    }));

    const toggleDevTools = new MenuItem({
        role: "toggleDevtools"
    });
    
    ctxMenu.append(toggleDevTools);

    mainWindow.webContents.on('context-menu', function(e, params){
        selectedUrl = params.srcURL.substr(8);
        selectedUrl = selectedUrl.replace("//", "/");
        selectedUrl = decodeURI(selectedUrl);
        
        console.log(selectedUrl);
        //ctxMenu.popup(mainWindow, params.x, params.y);
    });
});