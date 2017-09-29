import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

import { GoogleMaps } from '../../providers/google-maps';

@IonicPage()
@Component({
  selector: 'page-map-modal',
  templateUrl: 'map-modal.html',
})
export class MapModal {

  currentLoc: any;
  title: string;

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('directionsPanel') directionsPanel: ElementRef;


  constructor(
    private maps: GoogleMaps,
    private navParams: NavParams,
    private view: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapModal');
    this.currentLoc = this.navParams.data;
    console.log(this.currentLoc);
    this.title = this.currentLoc.title;

    this.maps.initMap(this.mapElement.nativeElement)

    this.maps.startNavigating(this.directionsPanel.nativeElement, this.currentLoc.latitude, this.currentLoc.longitude)

  }

  dismiss() {
    this.view.dismiss();
  }


}
