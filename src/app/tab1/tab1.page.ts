import { Component, OnInit } from '@angular/core';

import {MenuPage} from '../menu/menu.page';
// import {NavController} from '@ionic/angular';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  slideOpts = {initialSlide: 0, slidesPerView: 1, autoplay: true};
  menuPage = MenuPage;
  restaurants: Array<object>=[];
  // objectKeys = Object.keys;

  constructor(private router: Router) {}

  ngOnInit() {
    //load all restaurants
    let rootRef = firebase.database().ref();
    rootRef.child('restaurants').once('value').then(
      snapshot => {
        // this.restaurants = snapshot.val();
        console.log(this.restaurants);
        snapshot.forEach(item => {
          console.log(item.key + ":" + JSON.stringify(item.val()))
          let restaurant = {
            key: item.key,
            value: item.val()
          }
          this.restaurants.push(restaurant);
        })
      }
    );
  }

  //on every load, grey out the unavaliable restaurants
}
