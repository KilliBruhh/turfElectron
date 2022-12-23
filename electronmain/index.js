// index.js

// Modules to control application life and create 
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const os = require('os')
const { electron, title } = require('process')
const { filter } = require('rxjs')
// when i try to import fs i get and error on startup and i cannot use the nodejs api
// var fs = require('fs')



const createWindow = () => {
// Create the browser window.

const mainWindow = new BrowserWindow({
    
    width: 1300,
        sandbox: true,
        height: 1000,
    webPreferences: {
        contextIsolation: true,
        allowRunningInsecureContent: false,
        experimentalFeatures: false,
        sandbox: true,
        preload: path.join(__dirname, 'preload.js')
    }
})

// COntrol creaton of webview tags
app.on('web-contents-created', (event, contents) => {
    contents.on('will-attach-webview', (event, webPreferences, params) => {
      // Strip away preload scripts if unused or verify their location is legitimate
      delete webPreferences.preload
  
      // Disable Node.js integration
      webPreferences.nodeIntegration = false
  
      // Verify URL being loaded
      if (!params.src.startsWith('https://example.com/')) {
        event.preventDefault()
      }
    })
  })


  // Limit navigation routes
  const URL = require('url').URL

  app.on('web-contents-created', (event, contents) => {
    contents.on('will-navigate', (event, navigationUrl) => {
      const parsedUrl = new URL(navigationUrl)
  
      if (parsedUrl.origin !== 'https://example.com') {
        event.preventDefault()
      }
    })
  })

// and load the index.html of the app.
mainWindow.loadFile('../www/index.html') //WDA aangepast!!

// Open the DevTools.
// mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// Example IPC communication
// This listener listens on channel 'do-a-thing' defined in preload.js
ipcMain.on('do-a-thing', (event, arg) => {
    console.log("Running in main process triggered from renderer");
        
    //example node.js api call:
    let hostname = os.hostname();
    event.reply('do-a-thing-reply', 'Hi this is main process, I am running on host in event reply: '+ hostname)
})

// For auto reloading
// https://flaviocopes.com/electron-hot-reload/
try {
    require('electron-reloader')(module)
} catch (_) {}

// Testing IPC Methods
// greet is the channel we send the message on MUST BE SAME NAME AS IN preload.js!!
ipcMain.on("greet", (event, args) => {
    console.log("greet function loaded");
    console.log(args)
})

// Saving filess
// Not functional because startup errors when using fs import
ipcMain.on('saveFile', (event, args) => {

 /*    fs.writeFile(path.join(__dirname, '../../turfFiles','turfX.txt'), (err) => {
        if (err) throw err;
        console.log('write complete');
        event.reply('saveFile-reply','write complete')
    })
 */
})

// goto brand webpage


ipcMain.on('gotoWebpage', (event, args) => {
    const win = new BrowserWindow({ width: 1200, height: 1000 })
    switch (args) 
    {
        
        case 'Cola':
            win.loadURL('https://nl.coca-cola.be/')
            break;
        case 'Sprite':
            win.loadURL('https://www.lipton.com/be/nl/')
            break;

        // SHows white window --> SOLUTIOn has to be bigger than 800x600

    }
})



