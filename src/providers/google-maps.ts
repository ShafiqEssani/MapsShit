import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { Events } from 'ionic-angular';

declare var google;

@Injectable()
export class GoogleMaps {

  markerCluster: any;
  mapElement: any;
  markers: any = [];
  map: any;
  lat: number;
  lng: number;


  constructor(private geolocation: Geolocation,
    private events: Events) {
    console.log('Hello GoogleMaps Provider');

  }

  initMap(mE): Promise<any> {

    this.lat = parseFloat(localStorage.getItem('latitude'));
    this.lng = parseFloat(localStorage.getItem('longitude'));
    console.log("service:", typeof (this.lat), this.lng);

    return new Promise((resolve) => {
      this.mapElement = mE;

      let latLng = new google.maps.LatLng(this.lat, this.lng);
      //console.log("this:", latLng);

      let mapOptions = {
        center: latLng,
        zoom: 15, //can be 10,15,20 etc
        mapTypeId: google.maps.MapTypeId.ROADMAP //satellite or hybrid or terrain
      }

      this.map = new google.maps.Map(this.mapElement, mapOptions);
      resolve(true);
      console.log("map loaded");
    })
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

  startNavigating(dp, lat: number, lng: number) {


    //let directionsPanel = dp;

    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;

    directionsDisplay.setMap(this.map);
    directionsDisplay.setPanel(dp);

    directionsService.route({
      origin: { lat: this.lat, lng: this.lng }, //24.873805, 67.067272
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
