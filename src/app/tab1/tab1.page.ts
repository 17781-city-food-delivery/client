import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { OnEnter } from '../on-enter';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnEnter, OnDestroy  {
  private subscription: Subscription;
  slideOpts = {initialSlide: 0, slidesPerView: 1, autoplay: true};
  restaurants: Array<object>=[];
  userTime: string;
  userLocation: string;
  userCategory: string;
  orderByTime: string;
  // objectKeys = Object.keys;

  constructor(public activatedRoute : ActivatedRoute, public router: Router, private storage: Storage, public alertController: AlertController) {
    //  this.loadSelectedRestaurant();
  }
  public async ngOnInit(): Promise<void> {
    await this.onEnter();

    this.subscription = this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd){
          if(event.url === '/' || event.url === '/tabs' || event.url === '/tabs/tab1') {
            this.onEnter();
          }
        }
    });
  }

  public async onEnter(): Promise<void> {
      // do your on enter page stuff here
      console.log("load selected restaurants!")
      this.loadSelectedRestaurant();
  }

  public ngOnDestroy(): void {
      this.subscription.unsubscribe();
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

    this.storage.forEach((val, key)=>{
      if(key == 'time'){
        this.userTime = val;
      }
      if(key == 'location') {
        this.userLocation = val;
      }
      if(key == 'category'){
        this.userCategory = val;
      }
    }).then(()=>{
      let rootRef = firebase.database().ref();
      rootRef.child('restaurants').once('value').then(
        snapshot => {
          // this.restaurants = snapshot.val();
          // console.log(this.restaurants);
          snapshot.forEach(item => {
            // console.log(item.key + ":" + JSON.stringify(item.val()))
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
    // console.log(this.restaurants);
  }
  /* Function returns a boolean indicating if the current restaurant matches user selection of time and location*/

  filterRestaurant(userTime: any, userLocation: any, place: any, beginTime: any, endTime: any) {
    let selected = true;
    //check if user chosen time falls in the range of begin and end time
    if(userTime < beginTime || userTime > endTime ) {
      selected = false;
    }
    //check if user chosen location is the same as each restaurant's location in db
    if(userLocation.toLowerCase().localeCompare(place.toLowerCase()) != 0) {
      selected = false;
    }
    console.log(selected);
    return selected;
  }

  async presentAlertConfirm(id: string) {
    const alert = await this.alertController.create({
      header: 'Friendly Warning',
      message: 'Cart will be emptied to order from a different restaurant.',
      buttons: [
        {
          text: 'Proceed',
          handler: () => {
            console.log('Confirm Okay');
            this.storage.set('cart', []).then(()=>{
            this.router.navigate(['/restaurant/' + id])
            });
          }
        }
        ,{
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        },
      ]
    });

    await alert.present();
  }

  goToNext(id: string) {
    this.storage.get('cart').then(val => {
      console.log(val)
      if(val.length == 0 || val[0].restaurant_id == id) {
        console.log('cart is empty!');
        this.router.navigate(['/restaurant/' + id])
      }else {
        this.presentAlertConfirm(id);
      }
    })
  }

}
