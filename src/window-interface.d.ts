// import { NgForm } from "@angular/forms";

interface Window {
    api: {
            
        /** Sends a signal to the main process */
        ipcSendToMain: () => void;
        
        /** Only sends a fixed string to the console */
        doThing: () => void;
        
        /** Set the listener for the reply from the main process */
        ipcReceiveReplyFromMain: (channel: string, listener: (event: any, ...arg: any) => void) => void;
        
        /** Get the versions */
        getElectronVersion: () => string;
        getNodeVersion: () => string;
        
        testIpc: () => string;

        // Validation
        validateForm: (errorCode : number) => string;

        // save file
        ipcSaveToFile: () => void;

        // goto Store webpage
        gotoProductwebpage: (brand : string) => void;

    };
    
}
