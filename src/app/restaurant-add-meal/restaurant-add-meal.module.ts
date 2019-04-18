import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RestaurantAddMealPage } from './restaurant-add-meal.page';

const routes: Routes = [
  {
    path: '',
    component: RestaurantAddMealPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RestaurantAddMealPage]
})
export class RestaurantAddMealPageModule {}
