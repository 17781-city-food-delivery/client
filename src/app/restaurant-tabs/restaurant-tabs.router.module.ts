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
        path: 'restaurant-tracker',
        children: [
          {
            path: '',
            loadChildren: '../restaurant-tracker/restaurant-tracker.module#RestaurantTrackerPageModule'
          }
        ]
      },
      {
        path: 'tab3',
        children: [
          {
            path: '',
            loadChildren: '../restaurant-tracker/restaurant-tracker.module#RestaurantTrackerPageModule'
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
