import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart-component.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule, IonicModule
  ],
  exports: [
    CartComponent
  ]
})
export class CartComponentModule { }
