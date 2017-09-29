import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class Home {

  tab1Root: string = 'MapPage';
  tab2Root: string = 'ListPage';

  constructor() {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Home');
  }

}
