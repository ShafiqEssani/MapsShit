import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';

import { Locations } from '../../providers/locations';

@IonicPage()
@Component({
  selector: 'page-list-page',
  templateUrl: 'list-page.html',
})
export class ListPage {

  constructor(private locations: Locations,
    private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }

  openModal(loc) {
    // const mOptions: ModalOptions = {
    //   enableBackdropDismiss: false
    // };

    let modal = this.modalCtrl.create('MapModal', loc);
    modal.present();
  }

}
