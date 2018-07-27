import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { User } from '../../models/user';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  signupForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, public firebaseProvider: FirebaseProvider) {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: this.matchingPasswords('password', 'confirmPassword')});
  }

  private matchingPasswords(pwdkey: string, confirmpwdkey: string) {
    return (group) => {
      let pwdInp = group.controls[pwdkey];
      let confpwdInp = group.controls[confirmpwdkey];
      if(pwdInp.value !== confpwdInp.value) {
        return confpwdInp.setErrors({notEqual: true})
      }
    }
  }

  public signupUser() {
    const username = this.signupForm.value.username;
    const password = this.signupForm.value.password;
    
    const user: User = new User(username, password);
    
    this.firebaseProvider.addUsers(user);
  }
}
