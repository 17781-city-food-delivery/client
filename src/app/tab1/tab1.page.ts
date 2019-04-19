import { Component, OnInit } from '@angular/core';

import {MenuPage} from '../menu/menu.page';
// import {NavController} from '@ionic/angular';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  slideOpts = {initialSlide: 0, slidesPerView: 1, autoplay: true};
  menuPage = MenuPage;
  restaurants: Array<object>=[];
  userTime: string;
  userLocation: string;
  // objectKeys = Object.keys;

  constructor(public activatedRoute : ActivatedRoute) {
    //  this.loadSelectedRestaurant();
  }

  ngOnInit() {
    //load all restaurants
    this.loadSelectedRestaurant();
  }
  ionViewDidEnter() {
    // this.loadSelectedRestaurant();
  }
  loadAllRestaurant() {
    this.restaurants = [];
    let rootRef = firebase.database().ref();
    rootRef.child('restaurants').once('value').then(
      snapshot => {
        // this.restaurants = snapshot.val();
        // console.log(this.restaurants);
        snapshot.forEach(item => {
          // console.log(item.key + ":" + JSON.stringify(item.val()))
          let restaurant = {
            key: item.key,
            value: item.val()
          }
          this.restaurants.push(restaurant);
        })
      }
    );
  }

  loadSelectedRestaurant() {
    this.restaurants = [];
    //todo:
    //get time and location selected by user from filter page √
    this.activatedRoute.queryParams
    .subscribe((res)=>{
      this.userTime = res.time || "";
      this.userLocation = res.location || "";

      let rootRef = firebase.database().ref();
      rootRef.child('restaurants').once('value').then(
        snapshot => {
          // this.restaurants = snapshot.val();
          // console.log(this.restaurants);
          snapshot.forEach(item => {
            console.log(item.key + ":" + JSON.stringify(item.val()))
            let pickup_place_times = item.val().pickup_place_time;
            let selected = false;
            for(let i = 0; i < pickup_place_times.length; i++) {
              let pickup_place_time = pickup_place_times[i];
              console.log(pickup_place_time)
              if(pickup_place_time == null) continue;
              
              let place = pickup_place_time.place;
              let beginTime = pickup_place_time.begin_time;
              let endTime = pickup_place_time.end_time;
              //when filter is not applied, display every restaurant:
              if(this.userTime == "" || this.userLocation == "") {
                selected = true;
              }else {
                selected = selected || this.filterRestaurant(this.userTime, this.userLocation, place, beginTime, endTime);
              }
              //check if user chosen time falls in the range of begin and end time:
            }
            if(selected) {
              let restaurant = {
                key: item.key,
                value: item.val()
              }
              this.restaurants.push(restaurant);
            }
          })
        }
    );
    });
    //display restaurants with selected pick up time and/or location only.
    //on every load, grey out the unavaliable restaurants
    console.log(this.restaurants);
  }
  /* Function returns a boolean indicating if the current restaurant matches user selection of time and location*/

  filterRestaurant(userTime: any, userLocation: any, place: any, beginTime: any, endTime: any) {
    let selected = true;
    //check if user chosen time falls in the range of begin and end time
    console.log("userTime is:" + userTime)
    console.log("userLocation is:" + userLocation)
    console.log("place from db is:"+ place)
    console.log("beginTime is:" + beginTime)
    console.log("endTime is:" + endTime)
    if(userTime < beginTime || userTime > endTime ) {
      selected = false;
    }
    if(userLocation.toLowerCase().localeCompare(place.toLowerCase()) != 0) {
      selected = false;
    }
    console.log(selected);
    //check if user chosen location is the same as each restaurant's location in db
    return selected;
  }
}
