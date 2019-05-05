import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {AlertController} from '@ionic/angular';
import {conditionallyCreateMapObjectLiteral} from '@angular/compiler/src/render3/view/util';

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

  constructor(public alertController: AlertController) {}

  rId: string = '1';
  trackSelectionFood: boolean = true;
  initFinished: boolean = false;

  orders: Array<Order> = [];
  mealTrackList: Array<object> = [];
  locationTrackList: Array<object> = [];
  mealSet: Set<string> = new Set<string>();

  ngOnInit() {
    console.log("RestaurantTrackerPage ngOnInit");
    var self = this;
    let rootRef = firebase.database().ref('orders/');
    rootRef.orderByChild('restaurant_id')
        .equalTo(self.rId)
        .on('value', ( function (snapshot) {
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
          self.getMeals();
          self.parseOrdersbyMeal();
          self.parseOrderbyLocation();
          self.initFinished = true;
        }));
  }
  async presentAlertRadio() {
    const alert = await this.alertController.create({
      header: 'Tracking Selection',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: 'Food',
          value: 'Food',
          checked: this.trackSelectionFood
        },
        {
          name: 'radio6',
          type: 'radio',
          label: 'Location',
          value: 'Location',
          checked: !this.trackSelectionFood
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data:string) => {
            console.log('Confirm Ok');
            console.log(data);
            let choice: boolean = (data === 'Food');
            if(this.trackSelectionFood != choice){
              this.trackSelectionFood = choice;
              if(data === 'Food'){
                console.log("show List by Food");
              }else if(data === 'Location'){
                console.log("show List by Location");
              }
            }

          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertNotification() {
    const alert = await this.alertController.create({
      header: 'Notification Selection',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: 'CMU Hunt',
          value: 'CMU Hunt'
        },
        {
          name: 'radio2',
          type: 'radio',
          label: 'CMU Tepper',
          value: 'CMU Tepper'
        },
        {
          name: 'radio3',
          type: 'radio',
          label: 'CMU UC',
          value: 'CMU UC'
        },
        {
          name: 'radio4',
          type: 'radio',
          label: 'UPitts',
          value: 'UPitts'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          /*role: 'cancel',
          cssClass: 'secondary',*/
          handler: (data:string) => {
            console.log('Confirm Cancel');
            console.log(data);
            this.notifyDelivered(data, false);
          }
        }, {
          text: 'Ok',
          handler: (data:string) => {
            console.log('Confirm Ok');
            console.log(data);
            this.notifyDelivered(data, true);
          }
        }
      ]
    });

    await alert.present();
  }

  notifyDelivered(location: string, isDelivered: boolean){
    console.log("notifyDelivered set " + location + " " + isDelivered);
    var self = this;
    let rootRef = firebase.database().ref('orders/');
    rootRef.orderByChild('restaurant_id')
        .equalTo(self.rId)
        .once('value')
        .then( function (snapshot) {
          console.log(snapshot.val());
          snapshot.forEach(i => {
            console.log(i.val().location);
            console.log(location);
           if(i.val().location === location){
             console.log("Found location");
             console.log(i.key);
             var updateStatus = {'delivered': isDelivered};
             rootRef.child(i.key).update(updateStatus);
           }
          });
        });
  }


  parseOrdersbyMeal(){
    console.log("parseOrdersbyMeal");
    let customers: Array<CustomerForMeal> = [];
    var self = this;
    this.mealSet.forEach(function(item){
      console.log("meal:`" + item);
      customers = self.getCustomerbyMeal(item);
      console.log(customers);
      self.mealTrackList.push(customers);
    });
    console.log("mealTrackList");
    console.log(this.mealTrackList);

  }

  parseOrderbyLocation(){
    console.log("parseOrderbyLocation");
    let locationSet = this.getLocation();
    let customers: Array<Array<object>> = [];
    var self = this;
    /*locationSet.forEach(function(loc){
      //console.log("location:`" + loc);
      customers = self.getCustomerbyLocation(loc);
      //console.log(customers);
      self.locationTrackList.push(customers);
    });*/
    for(let loc of locationSet){
      customers = self.getCustomerbyLocation(loc);
      //console.log(customers);
      self.locationTrackList.push(customers);
    }
    console.log("locationTrackList:");
    console.log(this.locationTrackList);
  }

  getLocation(){
    var set = new Set();
    for(let order of this.orders) {
      set.add(order.location);
    }
    return set;
  }

  getMeals(){
    console.log("getMeals");
    for(let order of this.orders) {
      //console.log(order);
      for(let item of order.items){
        //console.log(item);
        //console.log(item.meal_name);
        this.mealSet.add(item.meal_name);
      }
    }
  }

  getCustomerbyMeal(mealName: string){
    let customers: Array<CustomerForMeal> = [];
    for(let order of this.orders) {
      //console.log(order);
      for(let item of order.items){
        //console.log(item);
        //console.log(item.meal_name);
        if(item.meal_name === mealName){
          let customerName = order.username;
          console.log(item.meal_name + ': ' + item.quantity);
          if(customers.hasOwnProperty(customerName)){
            customers[customerName].count += item.quantity;
          }else{
            customers[customerName] = {};
            customers[customerName].count = item.quantity;
            customers[customerName].location = order.location;
            customers[customerName].name = customerName;
            customers[customerName].mealName = mealName;
          }
        }
      }
    }
    let customersArr: Array<CustomerForMeal> = [];
    //console.log("parse to array");
    for(var customer in customers){
      //console.log(customer.name);
      //console.log(customers[customer]);
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

  getCustomerbyLocation(targetLocation: string){
    console.log("getCustomerbyLocation:" + targetLocation);
    let customers: Array<CustomerForMeal> = [];
    for(let order of this.orders) {
      if(order.location === targetLocation){
        let userName = order.username;
        if(!customers.hasOwnProperty(userName)){
          customers[userName] = {};
          customers[userName].location = targetLocation;
          customers[userName].name = userName;
        }
        for(let item of order.items){
          let mealName = item.meal_name;
          if(customers[userName].hasOwnProperty(mealName)){
            customers[userName][mealName].count += item.quantity;
          }else{
            customers[userName][mealName] = {};
            customers[userName][mealName].count = item.quantity;
            customers[userName][mealName].mealName = mealName;
          }
        }
      }
    }
    console.log(customers);
    let customersArr: Array<Array<object>> = [];
    for(var customer in customers){
      let mealsArr: Array<object> = [];
      //let username = customer.name;
      let idx = 0;
      for(var meal of this.mealSet){
        //console.log(meal);
        if(customers[customer][meal]){
          console.log(customers[customer].name + ' has ' + meal);
          let cus = {
            index: idx,
            name: customers[customer].name,
            location: customers[customer].location,
            count: customers[customer][meal].count,
            mealname: customers[customer][meal].mealName,
          }
          mealsArr.push(cus);
          idx++;
        }
        //customersArr.push(mealsArr);
      }
      customersArr.push(mealsArr);
    }
    console.log(customersArr);
    return customersArr;
  }

}
