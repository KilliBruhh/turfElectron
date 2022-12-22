// Preload
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld(
'api',
{
    ipcSendToMain: () => {
        ipcRenderer.send('do-a-thing');
    },
    ipcReceiveReplyFromMain: (channel, listener) => {
        ipcRenderer.on(channel, listener);
    },
    doThing: () => {
        console.log('doThing executed in preload.js');
    },
    getElectronVersion: () => {
        return process.versions.electron; //also possible 'node' or 'chrome'
    }
}
);


// testing IPC Methods
const WINDOW_API = {    
    // send used to send message
    // greet is the name of the channel we are going to listen on
    greet: (message) => ipcRenderer.send("greet", message)
}

console.log('preload.js loaded');