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
const pBoxMenu = new Menu();
global.ctxMenu = ctxMenu;
global.pBoxMenu = pBoxMenu;

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

    const getInfo = new MenuItem({
        label: "Get Info",
        click: e =>{
            mainWindow.webContents.send('getInfo');
        }
    });

    const closerLook = new MenuItem({
        label: "Closer Look",
        click: e =>{
            mainWindow.webContents.send('closerLook');
        }
    });
    
    ctxMenu.append(toggleDevTools);
    ctxMenu.append(getInfo);
    pBoxMenu.append(toggleDevTools);
    pBoxMenu.append(getInfo);
    pBoxMenu.append(closerLook);

    mainWindow.webContents.on('context-menu', function(e, params){
        //ctxMenu.popup(mainWindow, params.x, params.y);
    });
});