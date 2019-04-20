import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.page.html',
  styleUrls: ['./dish-detail.page.scss'],
})
export class DishDetailPage implements OnInit {
  id: string;
  restaurant_id: string;
  dish_detail: {} = {
    name: "",
    price: "",
    description: ""
  };
  quantity: number = 1;

  constructor(
    public location: Location,
    public activatedRouter: ActivatedRoute,
    public router: Router,
    public storage: Storage) {}

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
          description: snapshot.val().description
        }
        this.dish_detail = dish_detail;
      }
    )
  }

  goBack() {
    this.location.back();
  }
  addToCart() {
    this.storage.set('meal_id', this.id);
    this.storage.set('restaurant_id', this.restaurant_id);
    this.storage.set('quantity', this.quantity);
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
}
