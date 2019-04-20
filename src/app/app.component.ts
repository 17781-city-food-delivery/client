import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
  ) {
    
    this.initializeApp();
    // const unsubscribe = firebase.auth().onAuthStateChanged(user => {
    //   if(!user) {
    //     window.location.href = '/signin'; //If User is not logged in, redirect to login page
    //     unsubscribe();
    //   }else {
    //     console.log("im a signed in user!")
    //     unsubscribe();
    //   }
    // });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
