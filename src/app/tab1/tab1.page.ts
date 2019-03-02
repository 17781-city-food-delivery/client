import { Component } from '@angular/core';

import {MenuPage} from '../menu/menu.page';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  slideOpts = {initialSlide: 0, slidesPerView: 1, autoplay: true};
  menuPage = MenuPage;

  constructor(public navCtrl: NavController) {}

}
