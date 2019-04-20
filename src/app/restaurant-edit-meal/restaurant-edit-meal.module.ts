import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RestaurantEditMealPage } from './restaurant-edit-meal.page';

const routes: Routes = [
  {
    path: '',
    component: RestaurantEditMealPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RestaurantEditMealPage]
})
export class RestaurantEditMealPageModule {}
