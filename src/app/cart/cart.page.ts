import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Location } from '@angular/common';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage {

  constructor(public toastController: ToastController, public location: Location) { }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Order Submitted!',
      duration: 2000
    });
    toast.present();
  }
  goBack() {
    this.location.back();
  }
}
