import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'restaurant/:id', loadChildren: './restaurant/restaurant.module#RestaurantPageModule' },
  { path: 'dish-detail/:id', loadChildren: './dish-detail/dish-detail.module#DishDetailPageModule' },
  { path: 'cart', loadChildren: './cart/cart.module#CartPageModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'signin', loadChildren: './signin/signin.module#SigninPageModule' },
  { path: 'edit-profile', loadChildren: './edit-profile/edit-profile.module#EditProfilePageModule' },
  { path: 'credit', loadChildren: './credit/credit.module#CreditPageModule' },
  { path: 'qrcode', loadChildren: './qrcode/qrcode.module#QrcodePageModule' },
  { path: 'owner-meal-list', loadChildren: './owner-meal-list/owner-meal-list.module#OwnerMealListPageModule' },
  { path: 'order-time-loc-filter', loadChildren: './order-time-loc-filter/order-time-loc-filter.module#OrderTimeLocFilterPageModule' },
  { path: 'restaurant-tabs', loadChildren: './restaurant-tabs/restaurant-tabs.module#RestaurantTabsPageModule' },
  { path: 'restaurant-edit-meal', loadChildren: './restaurant-edit-meal/restaurant-edit-meal.module#RestaurantEditMealPageModule' },
  { path: 'restaurant-edit-meal/:id', loadChildren: './restaurant-edit-meal/restaurant-edit-meal.module#RestaurantEditMealPageModule' },
  { path: 'restaurant-tracker', loadChildren: './restaurant-tracker/restaurant-tracker.module#RestaurantTrackerPageModule' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
