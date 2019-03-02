import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  private profile_items: ({ icon: string; label: string; link: string })[];
  constructor() {
    this.profile_items = [
      {
        'icon': 'clipboard',
        'label': 'Edit Profile',
        'link': null,
      },
      {
        'icon': 'car',
        'label': 'Track Order',
        'link': null,
      },
      {
        'icon': 'card',
        'label': 'My Credits',
        'link': null,
      },
      {
        'icon': 'barcode',
        'label': 'My QRCode',
        'link': null,
      },
      {
        'icon': 'contacts',
        'label': 'Restaurants! Partner with us',
        'link': null,
      },
      {
        'icon': 'log-out',
        'label': 'Log out',
        'link': '/signin'
      }
    ];
  }
}
