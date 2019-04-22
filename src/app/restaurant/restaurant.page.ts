import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import * as firebase from 'firebase';
import * as moment from 'moment';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.page.html',
  styleUrls: ['./restaurant.page.scss'],
})
export class RestaurantPage implements OnInit {
  id: string;
  currTime: any= moment().format('HH:mm');
  orderByTime: string;
  name: string;
  userCategory: string;
  // meals: [];
  mealsGrid: Array<Array<object>>;

  constructor(private activeRoute: ActivatedRoute, public alertController: AlertController, public router: Router, public storage: Storage) { }

  ngOnInit() {
    this.id = this.activeRoute.snapshot.paramMap.get("id");
    this.storage.get('category').then(val => {
      this.userCategory = val;
    })
    let rootRef = firebase.database().ref();
    rootRef.child('restaurants/' + this.id).once('value').then(
      snapshot => {
        this.orderByTime = snapshot.val().order_by_time;
        this.name = snapshot.val().name;
        //this.checkOrderTime();
      }
    )
    rootRef.child('restaurants/'+this.id + '/meals').once('value').then(
      snapshot => {
        let row = 0;
        let col = 0;
        this.mealsGrid = [];
        snapshot.forEach(item => {
          console.log("key-" + item.key + ": value-" + JSON.stringify(item.val()))
          console.log("row:" + row + " col:" + col)
          let meal = {
            id: item.key,
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
        });
        if(col % 2 === 1){
          this.mealsGrid[row][col % 2] = {};
        }
      }
    )
  }
  ionViewWillEnter() {
    // this.checkOrderTime();
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Order time has passed',
      subHeader: '',
      message: 'Please order from another restaurant.',
      buttons: [{
        text: 'Go to Home',
        handler: () => {
          this.router.navigate(['']);
        }
      }],
      backdropDismiss: false
    });

    await alert.present();
  }
  checkOrderTime() {
    console.log("checkordertime called")
    this.currTime = this.getCurrTime();
    console.log(this.currTime)
    console.log(this.orderByTime)
    if(this.currTime > this.orderByTime) {
      this.presentAlert();
    }
  }
  getCurrTime() {
    return moment().format('HH:mm');
  }
}
