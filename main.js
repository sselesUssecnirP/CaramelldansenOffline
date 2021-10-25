const { app, BrowserWindow } = require('electron');
const path = require('path')

function createWindow(width, height, file) {

    const win = new BrowserWindow({
        width: width,
        height: height,
        fullscreen: true,
        webPreferences: {
            nodeIntegration: true,
            devTools: false
        },
        titleBarStyle: 'hidden'
    });

    win.loadFile(file)
}

app.whenReady().then(() => {
    createWindow(1600, 1200, "index.html");
    
    console.log('loaded!')
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow(1600, 1200, "index.html")
      })
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});
