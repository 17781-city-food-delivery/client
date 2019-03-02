import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
    private upcoming: { image: string; quantity: string; "name": string; subtotal: string; location: string; status: string; order_time: string }[];
    private dates: string[];
    private history: ({ date: string; image: string; quantity: string; "name": string; subtotal: string; restaurant: string })[];
    private isUpcoming: boolean;
    private isHistory: boolean;

    constructor() {
        this.isUpcoming = true;

        this.upcoming = [
            {
                'name': 'Orange Chicken',
                'image': '/assets/food1.png',
                'quantity': '1',
                'location': 'CMU-Hunt',
                'subtotal': '$9.99',
                'status': 'Delivering',
                'order_time': ''
            }
        ];
        this.dates = ['Feb 22, 2019', 'Feb 18, 2019'];
        this.history = [
            {
                'name': 'Orange Chicken',
                'image': '/assets/food1.png',
                'quantity': '2',
                'restaurant': 'Little Asia',
                'subtotal': '$19.98',
                'date': 'Feb 22, 2019',
            },
            {
                'name': 'Spicy Ramen',
                'image': '/assets/food2.png',
                'quantity': '2',
                'restaurant': 'Rose Tea Cafe',
                'subtotal': '$22.98',
                'date': 'Feb 18, 2019'
            },
            {
                'name': 'Orange Chicken',
                'image': '/assets/food1.png',
                'quantity': '1',
                'restaurant': 'Little Asia',
                'subtotal': '$9.99',
                'date': 'Feb 18, 2019'
            }
        ];

    }

    showUpcoming() {
        this.isUpcoming = true;
        this.isHistory = false;
    }
    showHistory() {
        this.isUpcoming = false;
        this.isHistory = true;
    }
}
