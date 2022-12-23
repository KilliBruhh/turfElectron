import { Component } from '@angular/core';
import { NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';

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



  drink = '';
  turfColor = '';
  amount = '';

  color ='';
  showMsg = false;
  msg = '';

  randNum= 0;


  constructor(private ngZone: NgZone) {
      this.electronVersion = window.api.getElectronVersion();
      this.nodeVersion = window.api.getNodeVersion();

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

 

  // Validation with IPC
  onAddTurf(form: NgForm) {
    console.log("pressed button");
    if(!form.valid) {
      // invalid
      this.showMsg = true;
      this.color = 'red';

      if (this.drink == '') {
        this.msg = window.api.validateForm(1);  
        console.log("no drink");
      }
      else {
        this.msg = window.api.validateForm(2);  
        console.log("no amount");
      }
    }
    else if(form.valid) {
      // Valid
      this.showMsg = true;
      this.msg = window.api.validateForm(3);
      this.color = 'green';  
      console.log("succes");
    }
   // TODO : Msg is not working
  }

  testButton() {
    this.testStuff = window.api.testIpc();
  }

}

