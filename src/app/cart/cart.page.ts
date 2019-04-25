import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastController, AlertController, ActionSheetController, IonSelect } from '@ionic/angular';
import { Location } from '@angular/common';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';
import * as moment from 'moment';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit{
  items: any=[];
  total: number = 0;
  pickup_place_times = []
  // customAlertOptions: any = {
  //   header: 'Specify pick up time & location',
  //   subHeader: 'Select your toppings',
  //   message: '$1.00 per topping',
  //   translucent: true,
  //   buttons: [
  //     {
  //       text: 'Bring Me Food!',
  //       handler: () => {
  //         console.log('Confirm Okay');
  //         // this.storage.get('')
  //         this.confirmOrder();
  //       }
  //     }
  //     ,{
  //       text: 'Cancel',
  //       role: 'cancel',
  //       cssClass: 'secondary',
  //       handler: (blah) => {
  //         console.log('Confirm Cancel: blah');
  //       }
  //     },
  //   ]
  // };

  // @ViewChild('mySelect') selectRef: IonSelect;
  constructor(public toastController: ToastController,
    public location: Location,
    public storage: Storage,
    public alertController: AlertController,
    public actionSheetController: ActionSheetController) { }

  ngOnInit() {
    this.populateItems();
  }
  async presentToastOrderSubmit() {
    const toast = await this.toastController.create({
      message: 'Order Submitted!',
      duration: 2000
    });
    toast.present();
  }
  async presentToastEmptyOrder() {
    const toast = await this.toastController.create({
      message: 'Please Order First!',
      duration: 2000
    });
    toast.present();
  }
  async presentAlertConfirm() {
    if(this.items.length == 0) {
      this.presentToastEmptyOrder()
      return;
    }
    this.pickup_place_times = [];
    this.storage.get('cart').then(cartVal=>{
      this.storage.get('category').then((typeVal)=> {
        //query this restaurant's pick up time for this meal type:
        console.log(typeVal)
        let rootRef = firebase.database().ref();
        rootRef.child('restaurants/' + cartVal[0].restaurant_id + '/pickup_place_time/' + typeVal).once('value').then(snapshot=>{
          console.log(snapshot.val())
          snapshot.val().forEach((item) => {
            console.log(item)
            this.pickup_place_times.push(item);
          })
        }).then(() => {
          this.storage.get('location').then(async (locVal) => {
            console.log(this.pickup_place_times)
            console.log(locVal)
            let myinputs = []
            let preselect =false;
            this.pickup_place_times.forEach(pickup => {
              let input = {
                type: 'radio',
                label: pickup['location']+ " at " + pickup['begin_time'] + "-" + pickup['end_time'],
                value: {
                  location: 'CMU HUNT',
                  begin_time: pickup['begin_time'],
                  end_time: pickup['end_time']
                },
                checked: false
              }
              //pre-select with user option: check if option's location matches user selection
              if(locVal && locVal.toLowerCase() == pickup['location'].toLowerCase()){
                preselect = true
                input.checked = true
              }
              myinputs.push(input)
            })
            if(!preselect){
              myinputs[0].checked = true;
            }

            //present confirm order alert and confirm pick up option:
            const alert = await this.alertController.create({
              header: 'Confirm Order',
              message: 'Your order will be delivered to: ',
              buttons: [
                {
                  text: 'Bring Me Food!',
                  handler: () => {
                    console.log('Confirm Okay');
                    alert.onDidDismiss().then((alertData)=>{
                      this.confirmOrder(alertData, typeVal, cartVal[0].restaurant_id)
                    })
                  }
                }
                ,{
                  text: 'Cancel',
                  role: 'cancel',
                  cssClass: 'secondary',
                  handler: () => {
                    console.log('Confirm Cancel: blah');
                    alert.onDidDismiss().then((alertData)=>{
                      console.log(alertData)
                      console.log(alertData.data.values.location)
                      console.log(alertData.data.values.begin_time)
                      console.log(alertData.data.values.end_time)

                    })
                  }
                },
              ],
              inputs: myinputs,
            });
            await alert.present();
          })
        })
      })
    })
  }


  goBack() {
    this.location.back();
  }
  populateItems() {
    this.storage.get('category').then(userCat => {
      this.storage.get('cart').then(cart_array => {
        this.items = cart_array.filter(item => {
          return item.meal_type === userCat
        })

        
        this.total = 0;
        for(let i = 0; i < this.items.length; i++){
          this.total += this.items[i].quantity * this.items[i].price;
        }
      })
    })
    
  }
  remove(object) {
    let index = this.items.indexOf(object);
    this.items.splice(index, 1);
    //set new array
    this.storage.set('cart', this.items).then(()=>{
      this.populateItems();
    });
  }
  //user clicks confirm order
  confirmOrder(alertData, typeVal, restaurant_id) {
    
    //save order details to firebase db:
    let rootRef = firebase.database().ref();
    rootRef.child('restaurants/' + restaurant_id).once('value').then(snapshot=>{
      let restaurant_name = snapshot.val().name;
      let newOrderKey = rootRef.child('orders/').push().key;
    rootRef.child('orders/' + newOrderKey).set({
      date_time: moment().format('MMMM Do YYYY, h:mm:ss a'),
      items: this.items,
      paid: false,
      pickedup: false,
      total: this.total,
      user: firebase.auth().currentUser.uid,
      delivered: false,
      location: alertData.data.values.location,
      meal_type: typeVal,
      restaurant_id: restaurant_id,
      restaurant_name: restaurant_name
    }).then(()=>{
      this.storage.set('cart', []).then(()=>{
        this.items = [];
        this.total = 0;
      })
      this.presentToastOrderSubmit();
    });
    })
  }


}
