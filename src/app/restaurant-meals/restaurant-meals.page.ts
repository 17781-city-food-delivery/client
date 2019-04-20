import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-restaurant-meals',
  templateUrl: './restaurant-meals.page.html',
  styleUrls: ['./restaurant-meals.page.scss'],
})
export class RestaurantMealsPage implements OnInit {
  mealsGrid: Array<Array<object>>;

  constructor(public navCtrl: NavController) {  }

  ngOnInit() {
    console.log("jasper");
    let rootRef = firebase.database().ref();
    var self = this;
    rootRef.child('restaurants/1/meals/').on('value', function(snapshot) {
        console.log("RestaurantMealsPage init");
        let row = 0;
        let col = 0;
        self.mealsGrid = [];
        snapshot.forEach(item => {
            console.log("key-" + item.key + ": value-" + JSON.stringify(item.val()))
            //console.log("row:" + row + " col:" + col)
            let meal = {
                id: item.key,
                name: item.val().name,
                price: item.val().price,
                description: item.val().description
            };
            if (!self.mealsGrid[row]) self.mealsGrid[row] = []
            self.mealsGrid[row][col % 2] = meal;
            if(col % 2 === 1) {
                row++;
            }
            col++;
        });
        if(col % 2 === 1){
            self.mealsGrid[row][col % 2] = {};
        }
    });
  }

    deleteMeal(id){
      console.log("deleteMeal:" + id);
        firebase.database().ref('restaurants/1/meals/' + id).remove();
    }
}
