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
    // Versions
    getElectronVersion: () => {
        console.log("Hello electron");
        return process.versions.electron; //also possible 'node' or 'chrome'
    },
    getNodeVersion: () => {
        console.log("Hello node");
        return process.version;
    },
    // Testing
    testIpc: () => {
        console.log("Hello chrome");
        return "Test";
    },


}
);

// testing IPC Methods
const WINDOW_API = {    
    // send used to send message
    // greet is the name of the channel we are going to listen on
    greet: (message) => ipcRenderer.send("greet", message)
}

console.log('preload.js loaded');