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
    this.userTime = null;
    this.userLocation = null;
    this.userCategory = null;
    
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
        console.log(this.userTime)
        console.log(this.userLocation)
        console.log(this.userCategory)
        if((this.userCategory && this.userCategory != "")
        &&(this.userTime && this.userTime != "")
        &&(this.userLocation && this.userLocation != "")) {
              console.log("load selected restaurants!")
              this.loadSelectedRestaurant();
        }else {
          console.log("load all restaurants!")
          this.loadAllRestaurant();
        }
      })
      // }
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
    let rootRef = firebase.database().ref();
    rootRef.child('restaurants').once('value').then(
      snapshot => {
        // this.restaurants = snapshot.val();
        // console.log(this.restaurants);
        snapshot.forEach(item => {
          // console.log(item.key + ":" + JSON.stringify(item.val()))
          let pickup_place_times = [];
          let selected = false;
          if(this.userCategory == "lunch") {
            pickup_place_times = item.val().pickup_place_time.lunch || [];
          }else {
            pickup_place_times = item.val().pickup_place_time.dinner || [];
          }
          for(let i = 0; i < pickup_place_times.length; i++) {
            let pickup_place_time = pickup_place_times[i];
            console.log(pickup_place_time)
            if(pickup_place_time == null) continue;

            let location = pickup_place_time.location;
            let beginTime = pickup_place_time.begin_time;
            let endTime = pickup_place_time.end_time;

            selected = selected || this.filterRestaurant(this.userTime, this.userLocation, location, beginTime, endTime);
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

    //display restaurants with selected pick up time and/or location only.
    //on every load, grey out the unavaliable restaurants
    // console.log(this.restaurants);
  }
  /* Function returns a boolean indicating if the current restaurant matches user selection of time and location*/

  filterRestaurant(userTime: any, userLocation: any, location: any, beginTime: any, endTime: any) {
    let selected = true;
    //check if user chosen time falls in the range of begin and end time
    if(userTime < beginTime || userTime >= endTime ) {
      selected = false;
    }
    //check if user chosen location is the same as each restaurant's location in db
    if(userLocation.toLowerCase().localeCompare(location.toLowerCase()) != 0) {
      selected = false;
    }
    console.log(selected);
    return selected;
  }

  async presentAlertCart(id: string) {
    const alert = await this.alertController.create({
      header: 'Friendly Warning',
      message: 'Cart will be emptied to order from a different restaurant.',
      buttons: [
        {
          text: 'Proceed',
          handler: () => {
            
            console.log('Confirm Okay');
            this.storage.set('cart', []).then(()=>{
              this.presentAlertPickUp(id)})
            }
        }
        ,{
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.router.navigate(['']);
          }
        },
      ]
    });
    await alert.present();
  }

  // async presentAlertPickUp(id: string) {
  //   const alert = await this.alertController.create({
  //     header: 'Pick up not specified',
  //     message: 'You can still order by following the pick up time and locaiton provided by this restaurant',
  //     buttons: [
  //       {
  //         text: 'Order Lunch Anyway',
  //         handler: () => {
  //           this.userCategory = "lunch";
  //           this.storage.set('category', "lunch").then(()=>{
  //           this.router.navigate(['/restaurant/' + id])
  //           });
  //         }
  //       },
  //       {
  //         text: 'Order Dinner Anyway',
  //         handler: () => {
  //           this.userCategory = "dinner";
  //           this.storage.set('category', "dinner").then(()=>{
  //           this.router.navigate(['/restaurant/' + id])
  //           });
  //         }
  //       },
  //       {
  //         text: 'Specify Own Pick up',
  //         handler: () => {
  //           this.router.navigate(['/order-time-loc-filter'])
  //         }
  //       }
  //       ,{
  //         text: 'Cancel',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: (blah) => {
  //           console.log('Confirm Cancel: blah');
  //         }
  //       },
  //     ]
  //   });
  async presentAlertPickUp(id: string) {
    const alert = await this.alertController.create({
          header: 'Choose your meal:',
          buttons: [
            {
              text: 'Order Lunch',
              handler: () => {
                this.userCategory = "lunch";
                this.storage.set('category', "lunch").then(()=>{
                this.router.navigate(['/restaurant/' + id])
                });
              }
            },
            {
              text: 'Order Dinner',
              handler: () => {
                this.userCategory = "dinner";
                this.storage.set('category', "dinner").then(()=>{
                this.router.navigate(['/restaurant/' + id])
                });
              }
            },
            {
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
    //check if cart has items from last restaurant:
    this.storage.get('cart').then(val => {
      console.log(val)
      if(val){
        if(val.length == 0 || (val[0].restaurant_id == id)) {
          console.log('cart is empty or order from same restaurant!');
          this.presentAlertPickUp(id);
        }else {
          this.presentAlertCart(id);
        }
      }
  })}
}
