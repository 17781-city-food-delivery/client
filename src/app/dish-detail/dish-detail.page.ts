import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase';
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
  constructor(
    public location: Location,
    public activatedRouter: ActivatedRoute,
    public router: Router) {}

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

}
