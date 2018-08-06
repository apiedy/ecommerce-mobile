import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Toast } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserProvider } from '../../providers/user.service';
import { ToastService } from '../../providers/toast.service';

import { SignupPage } from '../signup/signup';
import { TabsPage } from '../tabs/tabs';

import { Config } from '../../shared/Config';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loginForm: FormGroup;
  public pushPage;
  private loading;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              public userService: UserProvider,
              public loadingCtrl: LoadingController,
              private toastService: ToastService) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.pushPage = SignupPage;
    this.loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: "Loading, please wait..."
    });
  }

  public login() {
    this.loading.present();
    
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    
    this.userService.login(username, password).subscribe(
      (user) => {
        if(user[0] && user.length === 1) {
          const toast: Toast = this.toastService.createToast(`Welcome, ${username}!`, 'Ok');
          this.toastService.openToast(toast, true);
          this.userService.setCurrentUser(user[0]);
          this.loading.dismiss();
          this.navCtrl.setRoot(TabsPage);
        }
        else {
          this.loading.dismiss();
          const toast = this.toastService.createToast('Invalid Details! Please try again...');
          this.toastService.openToast(toast);
        }
      },
      (err) => {
        this.loading.dismiss();
        const toast = this.toastService.createToast(Config.errorToastMsg);
        this.toastService.openToast(toast);
      }
    )
  }
}
