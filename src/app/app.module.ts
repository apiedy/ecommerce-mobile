import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';

import { SellPage } from '../pages/sell/sell';
import { ContactPage } from '../pages/contact/contact';
import { BuyPage } from '../pages/buy/buy';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';

import { AddProductModalComponent } from '../components/add-product-modal/add-product-modal';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { FirebaseProvider } from '../providers/firebase';
import { UserProvider } from '../providers/user.service';

import { firebaseConfig } from '../shared/firebase.config';
import { ProductService } from '../providers/products.service';

@NgModule({
  declarations: [
    MyApp,
    SellPage,
    ContactPage,
    BuyPage,
    TabsPage,
    LoginPage,
    SignupPage,
    AddProductModalComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      backButtonIcon: 'ios-arrow-back'
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SellPage,
    ContactPage,
    BuyPage,
    TabsPage,
    LoginPage,
    SignupPage,
    AddProductModalComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseProvider,
    UserProvider,
    ProductService
  ]
})
export class AppModule {}
