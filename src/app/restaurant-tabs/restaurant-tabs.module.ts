import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RestaurantTabsPageRoutingModule } from './restaurant-tabs.router.module';
import { RestaurantTabsPage } from './restaurant-tabs.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestaurantTabsPageRoutingModule
  ],
  declarations: [RestaurantTabsPage]
})
export class RestaurantTabsPageModule {}
