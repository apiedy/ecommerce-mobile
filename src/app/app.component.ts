import { Component } from '@angular/core';
import { Platform, App, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';

import { ToastService } from '../providers/toast.service';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  theme: string;
  
  constructor(platform: Platform, public app: App, public events:Events, statusBar: StatusBar, splashScreen: SplashScreen, private network: Network, private toastService: ToastService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      
      this.theme = "facebook-messenger-theme";

      this.events.subscribe('user:logout', () => {
        this.app.getRootNav().setRoot(LoginPage);
      })
    });

    this.network.onDisconnect().subscribe(() => {
      const toast = this.toastService.createToast('Network Disconnected! All operations will continue to work normally.', 'top');
      this.toastService.openToast(toast, false);
    });
    
    this.network.onConnect().subscribe(() => {
      const toast = this.toastService.createToast('Back Online!', 'top');
      this.toastService.openToast(toast, false);
    });
  }
}
