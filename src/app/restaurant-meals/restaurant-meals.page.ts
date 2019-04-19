import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-restaurant-meals',
  templateUrl: './restaurant-meals.page.html',
  styleUrls: ['./restaurant-meals.page.scss'],
})
export class RestaurantMealsPage implements OnInit {
  mealsGrid: Array<Array<object>>;

  constructor() { }

  ngOnInit() {
    console.log("jasper");
    let rootRef = firebase.database().ref();
    rootRef.child('restaurants/1/meals/').once('value').then(
        snapshot => {
          console.log(snapshot.val());
          let row = 0;
          let col = 0;
          this.mealsGrid = [];
          snapshot.forEach(item => {
            console.log("key-" + item.key + ": value-" + JSON.stringify(item.val()))
            console.log("row:" + row + " col:" + col)
            let meal = {
              name: item.val().name,
              price: item.val().price,
              description: item.val().description
            };
            if (!this.mealsGrid[row]) this.mealsGrid[row] = []
            if(col % 2 === 0){
              //this.mealsGrid[row] = Array(2);
            }
            this.mealsGrid[row][col % 2] = meal;
            if(col % 2 === 1) {
              row++;
            }
            col++;
          })
        }
    );
  }
}
