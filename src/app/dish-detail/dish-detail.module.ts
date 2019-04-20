import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DishDetailPage } from './dish-detail.page';
// import { CartComponent } from '../components/cart-component/cart-component.component';

const routes: Routes = [
  {
    path: '',
    component: DishDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [DishDetailPage]
})
export class DishDetailPageModule {}
