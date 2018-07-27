import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  signupForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: this.matchingPasswords('password', 'confirmPassword')});
  }

  matchingPasswords(pwdkey: string, confirmpwdkey: string) {
    return (group) => {
      let pwdInp = group.controls[pwdkey];
      let confpwdInp = group.controls[confirmpwdkey];
      console.log(group.controls)
      console.log(pwdInp)
      if(pwdInp.value !== confpwdInp.value) {
        return confpwdInp.setErrors({notEqual: true})
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
