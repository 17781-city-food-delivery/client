import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-order-time-loc-filter',
  templateUrl: './order-time-loc-filter.page.html',
  styleUrls: ['./order-time-loc-filter.page.scss'],
})
export class OrderTimeLocFilterPage implements OnInit {
  timeLunch: string;
  locationLunch: string;
  timeDinner: string;
  locationDinner: string;
  category: string;
  filledOut: boolean;
  constructor(public router: Router, private storage: Storage, public toastController: ToastController) { }

  ngOnInit() {
    console.log("filter page init")
    this.storage.get('category').then((val)=> {
      this.category = val;
      if(this.category == 'lunch'){
        this.storage.get('time').then((val) => {
          this.timeLunch = val;
        })
        this.storage.get('location').then((val) => {
          this.locationLunch = val;
        })
      }else {
        this.storage.get('time').then((val) => {
          this.timeDinner= val;
        })
        this.storage.get('location').then((val) => {
          this.locationDinner = val;
        })
      }
    })
  }
  onChangeTime(time: any) {
    this.storage.set('time', time);
  }
  onChangeLocation(location: any) {
    this.storage.set('location', location);
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev.detail.value);
    this.storage.set('category', ev.detail.value);
  }
  reset() {
    this.storage.remove('time');
    this.storage.remove('location');
    this.timeLunch = "";
    this.timeDinner = "";
    this.locationLunch = "";
    this.locationDinner = "";
  }
  applyFilter() {
    this.filledOut = true;
    this.storage.get('time').then((val)=> {
      if(!val || val == ""){
        console.log("time is null")
        this.filledOut = false;
      }
      this.storage.get('location').then((val)=> {
        if(!val || val == ""){
          console.log("location is null")
          this.filledOut = false;
        }
        this.storage.get('category').then((val)=> {
          if(!val || val == ""){
            console.log("category is null")
            this.filledOut = false;
          }
          if(this.filledOut) {
            this.router.navigate(['']);
          }else {
            this.presentToastEmptyOrder();
          }
        });
      });
    });
  }
  async presentToastEmptyOrder() {
    const toast = await this.toastController.create({
      message: 'Please fill out pick up options.',
      duration: 2000
    });
    toast.present();
  }
  goBack() {
    this.router.navigate(['']);
  }
}
