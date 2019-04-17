import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantTabsPage } from './restaurant-tabs.page';

const routes: Routes = [
  {
    path: 'restaurant-tabs',
    component: RestaurantTabsPage,
    children: [
      {
        path: 'restaurant-meals',
        children: [
          {
            path: '',
            loadChildren: '../restaurant-meals/restaurant-meals.module#RestaurantMealsPageModule'
          }
        ]
      },
      {
        path: 'tab2',
        children: [
          {
            path: '',
            loadChildren: '../tab2/tab2.module#Tab2PageModule'
          }
        ]
      },
      {
        path: 'tab3',
        children: [
          {
            path: '',
            loadChildren: '../tab3/tab3.module#Tab3PageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: 'restaurant-tabs/restaurant-meals',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'restaurant-tabs/restaurant-meals',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class RestaurantTabsPageRoutingModule {}
