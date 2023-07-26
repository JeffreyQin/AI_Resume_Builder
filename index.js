const { app, BrowserWindow } = require('electron');
require('./app.js');

const createWindow = () => {
    const window = new BrowserWindow({
        width: 1600,
        height: 1200
    });
    window.loadFile('./ui/pages/index.html')
}

app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length == 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    app.quit();
});