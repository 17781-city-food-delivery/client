import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OrderTimeLocFilterPage } from './order-time-loc-filter.page';

const routes: Routes = [
  {
    path: '',
    component: OrderTimeLocFilterPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OrderTimeLocFilterPage]
})
export class OrderTimeLocFilterPageModule {}
