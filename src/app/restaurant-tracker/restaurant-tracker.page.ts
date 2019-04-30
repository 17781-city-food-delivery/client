import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

interface Order {
  id: string;
  username: string
  delivered: boolean;
  location: string;
  items: Array<Item>;
  paid: boolean;
  pickedup: boolean;
  total: number
  customer: string;
}

interface Item {
  meal_id: string;
  meal_name: string;
  meal_type: string;
  price: number;
  quantity: number;
  restaurant_id: string;
}

interface CustomerForMeal{
  name: string;
  count: number;
  location: string;
  mealName: string;
}


@Component({
  selector: 'app-restaurant-tracker',
  templateUrl: './restaurant-tracker.page.html',
  styleUrls: ['./restaurant-tracker.page.scss'],
})
export class RestaurantTrackerPage implements OnInit {

  constructor() {}

  orders: Array<Order> = [];
  initFinished: boolean = false;
  mealTrackList: Array<object> = [];

  ngOnInit() {
    console.log("RestaurantTrackerPage ngOnInit");
    var self = this;
    let rootRef = firebase.database().ref('orders/');
    let rID = "1";
    rootRef.orderByChild('restaurant_id')
        .equalTo(rID)
        .once('value')
        .then( function (snapshot) {
          console.log(snapshot.val());
          snapshot.forEach(i => {
            console.log(i.val().items);
            let order: Order = {
              id: i.key,
              username: i.val().username,
              delivered: i.val().delivered,
              location: i.val().location,
              items: i.val().items,
              paid: i.val().paid,
              pickedup: i.val().pickedup,
              total: i.val().total,
              customer: i.val().customer
            };
            //console.log(order.items.length);
            //console.log(order.items);
            self.orders.push(order);
          });
          self.parseOrders();
        });
  }

  parseOrders(){
    console.log("parseOrders");
    let mealSet = this.getMealsName();
    let customers: Array<CustomerForMeal> = [];
    var self = this;
    mealSet.forEach(function(item){
      console.log("meal:`" + item);
      customers = self.getCustomer(item);
      console.log(customers);
      self.mealTrackList.push(customers);
    });
    console.log("mealTrackList");
    console.log(this.mealTrackList);
    this.initFinished = true;
  }


  getMealsName(){
    var set = new Set();
    for(let order of this.orders) {
      //console.log(order);
      for(let item of order.items){
        //console.log(item);
        //console.log(item.meal_name);
        set.add(item.meal_name);
      }
    }
    return set;
  }


  getCustomer(mealName: string){
    let customers: Array<CustomerForMeal> = [];
    for(let order of this.orders) {
      //console.log(order);
      for(let item of order.items){
        //console.log(item);
        //console.log(item.meal_name);
        if(item.meal_name === mealName){
          let customerName = order.username;
          if(customers.hasOwnProperty(customerName)){
            customers[customerName].count += item.quantity;
          }else{
            customers[customerName] = {};
            customers[customerName].count = 1;
            customers[customerName].location = order.location;
            customers[customerName].name = customerName;
            customers[customerName].mealName = mealName;
          }
        }
      }
    }
    let customersArr: Array<CustomerForMeal> = [];
    console.log("parse to array");
    for(var customer in customers){
      //console.log(customer.name);
      console.log(customers[customer]);
      let cus = {
        name: customers[customer].name,
        count: customers[customer].count,
        location: customers[customer].location,
        mealName: customers[customer].mealName
      };
      customersArr.push(cus);
    }
    return customersArr;
  }
}
