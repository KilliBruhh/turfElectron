import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class BackendService {

  form!: NgForm;

  counter: any = 1;
  counterGet: any = 1;

  name!: string;
  lastName !: string;

  hasName: boolean = false;
 

  constructor() { }

  

  setLastName(ln:string) {
    this.lastName = ln;
    console.log(this.lastName);
  }
  getLastName() {
    return this.lastName;
  }


  setTurfForm(f:NgForm) {
    this.form = f;
    console.log(this.form); 
  }
  getTurfForm():NgForm {
    return this.form;
  }

  // Ionic capacitor Storage for Name
  async setName(n:string) {
    
  }
 
 
}
