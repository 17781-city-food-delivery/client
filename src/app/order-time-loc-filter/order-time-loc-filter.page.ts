import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-order-time-loc-filter',
  templateUrl: './order-time-loc-filter.page.html',
  styleUrls: ['./order-time-loc-filter.page.scss'],
})
export class OrderTimeLocFilterPage implements OnInit {
  time: any;
  location: string;

  constructor(public router: Router, private storage: Storage) { }

  ngOnInit() {
    this.storage.get('time').then((val) => {
      this.time = val;
    })
    this.storage.get('location').then((val) => {
      this.location = val;
    })
  }
  onChangeTime(time: any) {
    this.storage.set('time', time);
  }
  onChangeLocation(location: any) {
    this.storage.set('location', location);
  }
  goToHome() {
    this.router.navigate(['/tabs/tab1'], {
      queryParams: { 
        time: (this.time || ""),
        location: ( this.location || "")
      },
    });
  }

}
