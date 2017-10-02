import { Component, ElementRef, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { IonicPage, LoadingController, Platform } from 'ionic-angular';

import { GoogleMaps } from '../../providers/google-maps';
import { Locations } from '../../providers/locations';

@IonicPage()
@Component({
  selector: 'page-map-page',
  templateUrl: 'map-page.html',
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('directionsPanel') directionsPanel: ElementRef;

  constructor(private platform: Platform,
    private maps: GoogleMaps,
    private locations: Locations,
    private geolocation: Geolocation,
    private loadingController: LoadingController) {
  }

  lat: any;
  lng: any;

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');

    this.getLocation();


    // this.platform.ready().then(() => {
    // });

  }

  mainFunction() {
    let mapLoaded = this.maps.initMap(this.mapElement.nativeElement)

    this.lat = localStorage.getItem('latitude');
    this.lng = localStorage.getItem('longitude');
    console.log(this.lat, this.lng);
    this.maps.addMarker("You're here", "assets/marker.png", this.lat, this.lng);
    let locationsLoaded = this.locations.load();

    Promise.all([
      mapLoaded,
      locationsLoaded
    ]).then((result) => {
      let locations: any = result[1];
      for (let location of locations) {
        this.maps.addMarker(location.title, location.url, location.latitude, location.longitude);
      }
    });

  }

  getLocation() {

    let loader = this.loadingController.create({
      content: 'Fetching location',
      spinner: 'bubbles'
    });

    loader.present().then(() => {

      this.geolocation.getCurrentPosition({
        maximumAge: 3000,
        timeout: 5000,
        enableHighAccuracy: true
      }).then((position) => {

        localStorage.setItem('latitude', position.coords.latitude.toFixed(3).toString());
        localStorage.setItem('longitude', position.coords.longitude.toFixed(3).toString());

        loader.dismiss();
        this.mainFunction();

      }).catch((error) => {
        console.log('Error getting location', error);
        loader.dismiss();
      });
    });
  }

  // ionViewWillEnter() {
  //   console.log("ionViewWillEnter");
  // }

  // ionViewDidEnter() {
  //   console.log("ionViewDidEnter");
  // }

  // ionViewWillLeave() {
  //   console.log("ionViewWillLeave");
  // }

  // ionViewDidLeave() {
  //   console.log("ionViewDidLeave");
  // }



}
