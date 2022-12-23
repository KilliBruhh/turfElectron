import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor() {}


  gotoProductWebpage(drink : string) {
    console.log("pp vbutton pressed")
    window.api.gotoProductwebpage(drink);
  }

}
