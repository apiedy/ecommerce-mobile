import { Injectable } from '@angular/core';
import { ToastController, Toast } from 'ionic-angular';

import { Config } from '../shared/Config';

@Injectable()
export class ToastService {
    constructor(private toastCtrl: ToastController) { }

    public createToast(message, position, buttonText?, duration = Config.toastDuration): Toast {
        return this.toastCtrl.create({
            message: message,
            position: position,
            duration: duration * 1000,
            closeButtonText: buttonText
        });
    }

    public openToast(toast: Toast, showButton: boolean = false) {
        toast.setShowCloseButton(showButton)
             .present();
    }
}