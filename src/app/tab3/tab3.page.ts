import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  private profile_items: ({ icon: string; label: string })[];
  constructor() {
    this.profile_items = [
      {
        'icon': 'clipboard',
        'label': 'Edit Profile'
      },
      {
        'icon': 'car',
        'label': 'Track Order'
      },
      {
        'icon': 'card',
        'label': 'My Credits'
      },
      {
        'icon': 'barcode',
        'label': 'My QRCode'
      },
      {
        'icon': 'contacts',
        'label': 'Restaurants! Partner with us'
      },
      {
        'icon': 'log-out',
        'label': 'Log out'
      }
    ];
  }
}
