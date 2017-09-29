import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@Injectable()
export class GoogleMaps {

  markerCluster: any;
  mapElement: any;
  markers: any = [];
  map: any;
  // lat: any;
  // lng: any;
  //  latLng: any;
  // originLat: 

  constructor(private geolocation: Geolocation) {
    console.log('Hello GoogleMaps Provider');
  }

  // getLocation(): any {

  //   this.geolocation.getCurrentPosition()
  //     .then((position) => {
  //       console.log("position", position.coords.latitude);
  //       this.lat = position.coords.latitude;
  //       this.lng = position.coords.longitude;

  //       //console.log(this.lat, this.lng);
  //       return (position.coords.latitude, position.coords.longitude);
  //       // this.origin.lat = position.coords.latitude;
  //       // this.origin.lng = position.coords.longitude;

  //     }).catch((error) => {
  //       console.log('Error getting location', error);
  //     });
  // }

  initMap(mE): Promise<any> {

    return new Promise((resolve) => {
      this.mapElement = mE;

      // UNCOMMENT FOR NORMAL USE
      //let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      //this.getLocation()

      // this.geolocation.getCurrentPosition({ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true })
      //   .then((position) => {
      //     console.log("position", position.coords);
      //     // this.lat = position.coords.latitude;
      // this.lng = position.coords.longitude;

      let latLng = new google.maps.LatLng(24.873805, 67.067272);
      //console.log("this:", latLng);

      let mapOptions = {
        center: latLng,
        zoom: 15, //can be 10,15,20 etc
        mapTypeId: google.maps.MapTypeId.ROADMAP //satellite or hybrid or terrain
      }

      this.map = new google.maps.Map(this.mapElement, mapOptions);
      resolve(true);
      console.log("map loaded");

      //console.log(this.lat, this.lng);
      // return (position.coords.latitude, position.coords.longitude);
      // this.origin.lat = position.coords.latitude;
      // this.origin.lng = position.coords.longitude;

    })
    // .catch((error) => {
    //     console.log('Error getting location', error);
    //   });

    // let points = this.getLocation();
    // console.log(points);

    //console.log(this.lat, this.lng);

    //this.latLng = new google.maps.LatLng(24.873805, 67.067272);
    //this.addMarker(24.873805, 67.067272);

    //});

  }

  addMarker(name, url, lat: number, lng: number): void {

    //let directionsPanel = dP;

    let latLng = new google.maps.LatLng(lat, lng);

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng,
      icon: url
      //label: name,
      //title: 
    });

    this.markers.push(marker);

    let content = name;

    this.addInfoWindow(marker, content);
    //this.markerCluster = new MarkerClusterer(this.map, marker, { imagePath: 'C:\Users\New tm\Desktop\IonicApps\ionic2-nearby\src\assets\m1.png' });

  }

  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    //infoWindow.close();

    google.maps.event.addListener(marker, 'click', () => {

      infoWindow.open(this.map, marker);
      //this.startNavigating(dp, lat, lng);
    });

  }

  startNavigating(dp, lat, lng) {


    //let directionsPanel = dp;

    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;

    directionsDisplay.setMap(this.map);
    directionsDisplay.setPanel(dp);

    directionsService.route({
      origin: { lat: 24.873805, lng: 67.067272 }, //24.873805, 67.067272
      destination: { lat: lat, lng: lng }, //24.873576, 67.066860
      travelMode: google.maps.TravelMode['DRIVING']
    }, (res, status) => {

      if (status == google.maps.DirectionsStatus.OK) {

        directionsDisplay.setDirections(res);
      } else {
        console.warn(status);
      }

    });

  }




}
