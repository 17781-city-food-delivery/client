import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import * as firebase from 'firebase';
import * as moment from 'moment';
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
  meals: [];

  constructor(private activeRoute: ActivatedRoute, public alertController: AlertController, public router: Router) { }

  ngOnInit() {
    this.id = this.activeRoute.snapshot.paramMap.get("id");
    console.log(this.id);

    let rootRef = firebase.database().ref();
    rootRef.child('restaurants/'+this.id).once('value').then(
      snapshot => {
        // this.restaurants = snapshot.val();
        // console.log(this.restaurants);
        // console.log(snapshot.val())
        this.orderByTime = snapshot.val().order_by_time;
        // snapshot.forEach(item => {
        //   console.log(item.key + ":" + JSON.stringify(item.val()))
        //   if
        //   this.orderByTime = item.key;
        //   console.log(this.orderByTime);
        // })
        this.checkOrderTime();
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
