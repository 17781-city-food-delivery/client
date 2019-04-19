import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonDatetime } from '@ionic/angular';

@Component({
  selector: 'app-order-time-loc-filter',
  templateUrl: './order-time-loc-filter.page.html',
  styleUrls: ['./order-time-loc-filter.page.scss'],
})
export class OrderTimeLocFilterPage implements OnInit {
  time: any;
  location: string;

  constructor(public router: Router) { }

  ngOnInit() {
    
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
