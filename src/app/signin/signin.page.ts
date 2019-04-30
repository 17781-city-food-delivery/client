import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UsernameValidator } from '../validators/username.validator';
import { PasswordValidator } from '../validators/password.validator';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Storage } from '@ionic/storage'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  validations_form: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    public storage: Storage
    ) {}

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  tryLogin(value) {
    console.log(value);
    this.authService.loginUser(value)
    .then(res => {
      console.log(res);
      this.errorMessage = "";
      this.successMessage = "You have successfully logged in!";
      //empty cart
      this.storage.set('cart', []);
      this.router.navigate(["/tabs/tab1"]);
    }, err => {
      console.log(err);
      if(err.code == 'auth/user-not-found') {
        this.errorMessage = "user not found";
      }else if (err.code == 'auth/wrong-password' || err.code == 'auth/invalid-email'){
        this.errorMessage = "wrong password";
      }else{
        this.errorMessage = err.message;
      }
      this.successMessage = "";
    })
  }
}
