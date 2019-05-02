import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase';
import { Storage } from '@ionic/storage';
import { ToastController, LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.page.html',
  styleUrls: ['./dish-detail.page.scss'],
})
export class DishDetailPage implements OnInit {
  toastOpen: boolean=false;
  id: string;
  restaurant_id: string;
  dish_detail: {
    name: "",
    price: "",
    description: ""
  };
  quantity: number = 1;

  constructor(
    public location: Location,
    public activatedRouter: ActivatedRoute,
    public router: Router,
    public storage: Storage,
    public toastController: ToastController, public loadingController: LoadingController) {}

  ngOnInit() {
    this.id = this.activatedRouter.snapshot.paramMap.get('id');
    this.restaurant_id = this.activatedRouter.snapshot.queryParams.restaurant_id;
    let rootRef = firebase.database().ref();
    rootRef.child('restaurants/' + this.restaurant_id + '/meals/' + this.id).once('value').then(
      snapshot => {
        console.log(snapshot.val());
        let dish_detail = {
          name: snapshot.val().name,
          price: snapshot.val().price,
          description: snapshot.val().description,
          meal_type: snapshot.val().meal_type
        }
        this.dish_detail = dish_detail;
      }
    )
  }

  goBack() {
    this.location.back();
  }
  addToCart() {
    this.storage.get('cart').then((val) => {
      let cart_array = [];
      if(!val){
        this.storage.set('cart', []);
      }else {
        cart_array = val;
      }
      let meal = {
        meal_id: this.id,
        meal_name: this.dish_detail['name'],
        price: this.dish_detail['price'],
        meal_type: this.dish_detail['meal_type'],
        restaurant_id: this.restaurant_id,
        quantity: this.quantity
      }
      cart_array.push(meal);
      this.storage.set('cart', cart_array).then(()=>{
        this.presentToast();
      });
    });
  }
  increment() {
    if(this.quantity < 5) {
      this.quantity++;
    }
  }
  decrement() {
    if(this.quantity > 1) {
      this.quantity--;
    }
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Meal added to Cart!',
      duration: 2000
    });
    toast.present();
    this.toastOpen = true;

    // reset after 2 seconds
    setTimeout(() => {
        this.toastOpen = false;
    }, 2000);
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 1000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }
}
