import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-restaurant-edit-meal',
  templateUrl: './restaurant-edit-meal.page.html',
  styleUrls: ['./restaurant-edit-meal.page.scss'],
})
export class RestaurantEditMealPage implements OnInit {

  mealId = null;
  meal =  {};

  constructor(private route: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.mealId = this.route.snapshot.params['id'];
    console.log("RestaurantEditMealPage mealId:" + this.mealId);
    if (this.mealId)  {
      this.loadMeal();
    }
  }

  loadMeal(){
    let rootRef = firebase.database().ref();
    rootRef.child('restaurants/1/meals/').once('value').then(
        snapshot => {
          console.log(snapshot.val());
          snapshot.forEach(item => {
            console.log(item.val().id);
            if(item.key === this.mealId){
              this.meal = {
                name: item.val().name,
                price: item.val().price,
                description: item.val().description,
                picture: item.val().picture
              };
            }
          })
        }
    );
  }

  saveMeal(){
    console.log("saveMeal")
    console.log(this.meal);
    var tmpMeal: any = this.meal;
    var postData = {
      name: tmpMeal.name? tmpMeal.name: "",
      price: tmpMeal.price? tmpMeal.price: 0,
      description : tmpMeal.description? tmpMeal.description: "",
      picture: tmpMeal.picture? tmpMeal.picture:""
    };
    if(this.mealId){
      var seff = this;
      firebase.database().ref('restaurants/1/meals/' + this.mealId).set(postData, () => {
        this.router.navigate(['/restaurant-tabs']);
      });
    }else{

      var newPostKey = firebase.database().ref().child('restaurants/1/meals/').push().key;
      var updates = {};
      updates['restaurants/1/meals/' + newPostKey] = postData;
      firebase.database().ref().update(updates, () => {
        this.router.navigate(['/restaurant-tabs']);
      });
    }
  }
}
