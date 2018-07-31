import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserProvider } from '../../providers/user.service';

import { SignupPage } from '../signup/signup';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;
  pushPage;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              public userService: UserProvider) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.pushPage = SignupPage;
  }

  public login() {
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    this.userService.login(username, password).subscribe(
      (user) => {
        if(user[0]) {
          this.userService.setCurrentUser(user[0]);
          this.navCtrl.setRoot(TabsPage);
        }
      },
      (err) => { }
    )
  }
}
