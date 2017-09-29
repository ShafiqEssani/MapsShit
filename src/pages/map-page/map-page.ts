import { Component, ElementRef, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { IonicPage, Platform } from 'ionic-angular';

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
    private geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');

    this.platform.ready().then(() => {

      //let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement);

      let mapLoaded = this.maps.initMap(this.mapElement.nativeElement)

      // this.geolocation.getCurrentPosition()
      //   .then((position) => {
      //     console.log("position", position.coords);
      //     // this.lat = position.coords.latitude;
      //     // this.lng = position.coords.longitude;

      //     //console.log(this.lat, this.lng);
      //     //return (position.coords.latitude, position.coords.longitude);
      //     // this.origin.lat = position.coords.latitude;
      //     // this.origin.lng = position.coords.longitude;
      //     //this.maps.addMarker("You're here", "assets/marker.png", position.coords.latitude, position.coords.longitude);

      //   }).catch((error) => {
      //     console.log('Error getting location', error);
      //   });

      this.maps.addMarker("You're here", "assets/marker.png", 24.873805, 67.067272);
      let locationsLoaded = this.locations.load();

      //console.log("maps: ", mapLoaded);

      Promise.all([
        mapLoaded,
        locationsLoaded
      ]).then((result) => {
        //console.log("maps: ", mapLoaded);

        console.log("result: ", result);

        let locations: any = result[1];

        for (let location of locations) {
          console.log("loc", location);

          this.maps.addMarker(location.title, location.url, location.latitude, location.longitude);
        }


      });

    });

  }

}
