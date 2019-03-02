import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.page.html',
  styleUrls: ['./credit.page.scss'],
})
export class CreditPage {
  private credit_items: ({ restaurant: string; credit: string })[];

  constructor() {

    this.credit_items = [
      {
        'restaurant': 'Little Asia',
        'credit': '10'
      },
      {
        'restaurant': 'Oriental Express',
        'credit': '20'
      },
      {
        'restaurant': 'Fuku Cafe',
        'credit': '8'
      },
      {
        'restaurant': 'Coco Tea',
        'credit': '5'
      }
    ];
  }

}
