import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  private profile_items: ({ icon: string; label: string; link: string })[];
  constructor(
    private router: Router,
    private authService: AuthenticationService,) {
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
    ];
  }

  tryLogout(){
    this.authService.logoutUser()
    .then(res => {
      console.log(res);
      //this.router.navigate(['/signin']);
    })
    .catch(error => {
      console.log(error);
    })
  }
}
