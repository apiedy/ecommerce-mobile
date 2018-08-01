import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';

import { SellPage } from '../pages/sell/sell';
import { InventoryPage } from '../pages/inventory/inventory';
import { BuyPage } from '../pages/buy/buy';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ProductPage } from '../pages/product/product';

import { AddProductModalComponent } from '../components/add-product-modal/add-product-modal';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { FirebaseProvider } from '../providers/firebase';
import { UserProvider } from '../providers/user.service';
import { ProductService } from '../providers/products.service';
import { InventoryService } from '../providers/inventory.service';

import { firebaseConfig } from '../shared/firebase.config';

@NgModule({
  declarations: [
    MyApp,
    SellPage,
    InventoryPage,
    BuyPage,
    TabsPage,
    LoginPage,
    SignupPage,
    ProductPage,
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
    InventoryPage,
    BuyPage,
    TabsPage,
    LoginPage,
    SignupPage,
    ProductPage,
    AddProductModalComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseProvider,
    UserProvider,
    ProductService,
    InventoryService
  ]
})
export class AppModule {}
