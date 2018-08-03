import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { UserProvider } from '../../providers/user.service';
import { ToastService } from '../../providers/toast.service';

import { CONST } from '../../shared/constants';

@Component({
  selector: 'more-menu',
  templateUrl: 'more-menu.html'
})
export class MoreMenuComponent {

  constructor(public userService: UserProvider, public navCtrl: NavController, public loadingCtrl: LoadingController, public toastService: ToastService) {  }

  public logout() {
    const loading = this.loadingCtrl.create({
      content: CONST.logoutLoadingText,
      spinner: CONST.loadingSpinner,
      duration: 500
    });

    const toast = this.toastService.createToast('You have successfully logged out of the app.', 'bottom');
    loading.present();
    this.userService.logout();
    this.toastService.openToast(toast, false);
  }
}
