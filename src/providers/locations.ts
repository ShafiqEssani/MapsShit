import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';

@Injectable()
export class Locations {

  data: any;
  lat: any;
  lng: any;

  constructor(private http: Http,
    private geolocation: Geolocation) {
    console.log('Hello Locations Provider');

    // this.geolocation.getCurrentPosition()
    //   .then((position) => {
    //     console.log("position", position.coords.latitude);
    //     this.lat = position.coords.latitude;
    //     this.lng = position.coords.longitude;
    //     //console.log(this.lat, this.lng);
    //     //return (position.coords.latitude, position.coords.longitude);
    //     // this.origin.lat = position.coords.latitude;
    //     // this.origin.lng = position.coords.longitude;
    //   }).catch((error) => {
    //     console.log('Error getting location', error);
    //   });
  }

  load() {

    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {

      this.http.get('assets/data/locations.json').map(res => res.json()).subscribe(data => {

        this.data = this.applyHaversine(data.locations);

        this.data.sort((locationA, locationB) => {
          return locationA.distance - locationB.distance;
        });

        resolve(this.data);
      });

    });
  }

  applyHaversine(locations) {
    // console.log(this.lat);
    // console.log(this.lng);

    let usersLocation = {
      //must be your current location
      lat: 24.873805,
      lng: 67.067272
    };

    locations.map((location) => {

      let placeLocation = {
        lat: location.latitude,
        lng: location.longitude
      };

      location.distance = this.getDistanceBetweenPoints(
        usersLocation,
        placeLocation,
        'miles'
      ).toFixed(2);
    });

    return locations;
  }

  getDistanceBetweenPoints(start, end, units) {

    let earthRadius = {
      miles: 3958.8,
      km: 6371
    };

    let R = earthRadius[units || 'miles'];
    let lat1 = start.lat;
    let lon1 = start.lng;
    let lat2 = end.lat;
    let lon2 = end.lng;

    let dLat = this.toRad((lat2 - lat1));
    let dLon = this.toRad((lon2 - lon1));
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;

    return d;

  }

  toRad(x) {
    return x * Math.PI / 180;
  }

}
