import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgZone } from '@angular/core';


import { BackendService } from '../backend.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})  




export class Tab1Page {

  drink!: string;
  amount!: string;

  color = "";
  msg = "";
  showMsg: boolean = false;


  

  reply = '';
  electronVersion = '';
  constructor(private ngZone: NgZone, private bs: BackendService) {
      this.electronVersion = window.api.getElectronVersion();
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

  onAddTurf(form:NgForm) {
    if(!form.valid) {
      this.showMsg = true;
      this.color = "red";
      this.msg = "Fill in all fields!";
    }
    else {
      this.showMsg = true;
      this.color = "green";
      this.msg = "Welcome to our app!";
      
      this.bs.setName(this.drink);
      this.bs.setLastName(this.amount);
    }
  }


}
