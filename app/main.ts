const { app, BrowserWindow } = require('electron');
const path = require('path');
const configHandler = require('../app/handlers/configHandler.js');
configHandler.initialize();
function createWindow () {
  let windowConfig = configHandler.data.window;
  windowConfig.webPreferences.preload = '../app/preload.js';
  const mainWindow = new BrowserWindow(windowConfig);
  if (configHandler.flux.window.startMaximized)
    mainWindow.maximize();

  mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0)
        createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin')
    app.quit();
});