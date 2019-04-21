import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController, ActionSheetController } from '@ionic/angular';
import { Location } from '@angular/common';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';
import * as moment from 'moment';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit{
  items: any=[];
  total: number = 0;

  constructor(public toastController: ToastController,
    public location: Location,
    public storage: Storage,
    public alertController: AlertController,
    public actionSheetController: ActionSheetController) { }

  ngOnInit() {
    this.populateItems();
  }
  async presentToastOrderSubmit() {
    const toast = await this.toastController.create({
      message: 'Order Submitted!',
      duration: 2000
    });
    toast.present();
  }
  async presentToastEmptyOrder() {
    const toast = await this.toastController.create({
      message: 'Please Order First!',
      duration: 2000
    });
    toast.present();
  }
  async presentAlertConfirm() {
    if(this.items.length == 0) {
      this.presentToastEmptyOrder()
      return;
    }
    const alert = await this.alertController.create({
      header: 'Confirm Order?',
      message: 'Your order will be deliver to hunt at 11:00am.',
      buttons: [
        {
          text: 'Bring Me Food!',
          handler: () => {
            console.log('Confirm Okay');
            this.confirmOrder();
          }
        }
        ,{
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


  goBack() {
    this.location.back();
  }
  populateItems() {
    this.storage.get('cart').then(cart_array => {
      this.items = cart_array;
      this.total = 0;
      for(let i = 0; i < cart_array.length; i++){
        this.total += cart_array[i].quantity * cart_array[i].price;
      }
    })
  }
  remove(object) {
    let index = this.items.indexOf(object);
    this.items.splice(index, 1);
    //set new array
    this.storage.set('cart', this.items).then(()=>{
      this.populateItems();
    });
  }
  //user clicks confirm order
  confirmOrder() {
    //save order details to firebase db:
    let rootRef = firebase.database().ref();
    let newOrderKey = rootRef.child('orders/').push().key;
    rootRef.child('orders/' + newOrderKey).set({
      date_time: moment().format('MMMM Do YYYY, h:mm:ss a'),
      items: this.items,
      paid: false,
      pickedup: false,
      total: this.total,
      user: firebase.auth().currentUser.uid
    }).then(()=>{
      this.storage.set('cart', []).then(()=>{
        this.items = [];
        this.total = 0;
      })
      this.presentToastOrderSubmit();
    });
  }
  //user clicks order from another restaurant
  cancelOrder() {

  }

}
