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
        'link': '/edit-profile',
      },
      {
        'icon': 'car',
        'label': 'Track Order',
        'link': '/tabs/tab2',
      },
      {
        'icon': 'card',
        'label': 'My Credits',
        'link': '/credit',
      },
      {
        'icon': 'barcode',
        'label': 'My QRCode',
        'link': '/qrcode',
      },
      {
        'icon': 'contacts',
        'label': 'Restaurants! Partner with us',
        'link': '/signup',
      },
      {
        'icon': 'log-out',
        'label': 'Log out',
        'link': '/signin'
      }
    ];
  }
}
