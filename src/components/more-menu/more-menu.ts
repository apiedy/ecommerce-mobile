import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { UserProvider } from '../../providers/user.service';

@Component({
  selector: 'more-menu',
  templateUrl: 'more-menu.html'
})
export class MoreMenuComponent {

  constructor(public userService: UserProvider, public navCtrl: NavController, public loadingCtrl: LoadingController) {  }

  public logout() {
    const loading = this.loadingCtrl.create({
      duration: 2000
    });

    loading.present();
    this.userService.logout();
  }
}
