import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import * as firebase from 'firebase';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
  profile_items: ({ icon: string; label: string; link: string })[];
  username: string = "";
  email: string = "";

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
      // {
      //   'icon': 'barcode',
      //   'label': 'My QRCode',
      //   'link': '/qrcode',
      // },
      // {
      //   'icon': 'contacts',
      //   'label': 'Restaurants! Partner with us',
      //   'link': '/restaurant-tabs',
      // },
    ];
  }
  ngOnInit() {
    let userId = firebase.auth().currentUser.uid;
    firebase.database().ref('/userProfiles/' + userId).once('value').then(snapshot => {
      let username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
      let email = snapshot.val().email;

      this.username = username;
      this.email = email;
    });
  }
  tryLogout(){
    this.authService.logoutUser()
    .then(res => {
      console.log(res);
      this.router.navigate(['/signin']);
    })
    .catch(error => {
      console.log(error);
    })
  }

}
