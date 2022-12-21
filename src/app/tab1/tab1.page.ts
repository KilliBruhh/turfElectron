import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

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


  constructor(private bs: BackendService) {}

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
