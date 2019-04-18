import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UsernameValidator } from '../validators/username.validator';
import { PasswordValidator } from '../validators/password.validator';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  validations_form: FormGroup;
  matching_passwords_group: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  username: string = '';

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    ) { }

  ngOnInit() {
    // this.matching_passwords_group = new FormGroup({
    //   password: new FormControl('', Validators.compose([
    //     Validators.minLength(8),
    //     Validators.required,
    //     // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
    //   ])),
    //   confirm_password: new FormControl('', Validators.required)
    // }, (formGroup: FormGroup) => {
    //   return PasswordValidator.validateMatch(formGroup);
    // });
    this.validations_form = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
        // UsernameValidator.usernameTaken,
        Validators.required,
        // Validators.minLength(4),
        Validators.maxLength(25),
      ])),
      // matching_passwords: this.matching_passwords_group,
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
    });
  }
  validation_messages = {
    'username': [
      { type: 'required', message: 'Username is required.' },
      // { type: 'minlength', message: 'Username must be at least 4 characters long.' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
      // { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
      // { type: 'usernameTaken', message: 'Your username has already been taken.' }
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please wnter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 8 characters long.' },
      // { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required.' }
    ],
    'matching_passwords': [
      { type: 'validateMatch', message: 'Password mismatch.' }
    ]
  }

  //todo: use firebase signup to replace the following:
  tryRegister(value) {
    // console.log(value);
    this.authService.registerUser(value)
     .then(res => {
       console.log(res);
       this.errorMessage = "";
       this.successMessage = "Your account has been created. You are logged in.";
       let rootRef = firebase.database().ref();
          rootRef.child('userProfiles/' + res.user.uid)
          .set({
            username: this.username,
            email: value.email,
          })
       this.router.navigate(["/tabs/tab1"]);
       //this.router.navigate(["/signin"]);
     }, err => {
       console.log(err);
       this.errorMessage = err.message;
       this.successMessage = "";
     })
  }
  // goToLoginPage(){
  //   this.router.navigate(["/login"]);
  // }
}

