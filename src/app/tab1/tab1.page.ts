import { Component } from '@angular/core';
import { NgZone } from '@angular/core';

@Component({
selector: 'app-tab1',
templateUrl: 'tab1.page.html',
styleUrls: ['tab1.page.scss']
})

export class Tab1Page {

  reply = '';
  electronVersion = '';
  nodeVersion = '';
  testStuff = '';
  randNum= 0;


  constructor(private ngZone: NgZone) {
      this.electronVersion = window.api.getElectronVersion();
      this.nodeVersion = window.api.getNodeVersion();
      this.testStuff = window.api.testIpc();
      window.api.ipcSendToMain();


      window.api.ipcReceiveReplyFromMain('do-a-thing-reply',(event: any, arg: any) => {
        console.log(arg);
        //Because the event handlers are called outside the context of Angular
        //Angular Can't do "change detection" and the html won't be updated if the variables
        //are changed. (Here reply via string interpolation in the html)
        //Use the 2 lines below to show that the value has been changed but without the
        //ngZone.run the new content will not be visible in the html
        //this.reply = arg;
        //console.log(this.reply);
        
        this.ngZone.run(() => {
            this.reply = arg;
        });
      });
  }

}