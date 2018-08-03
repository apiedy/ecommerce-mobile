import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireOfflineModule } from 'angularfire2-offline';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { SellPage } from '../pages/sell/sell';
import { InventoryPage } from '../pages/inventory/inventory';
import { BuyPage } from '../pages/buy/buy';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ProductPage } from '../pages/product/product';
import { MorePage } from '../pages/more/more';

import { AddProductModalComponent } from '../components/add-product-modal/add-product-modal';
import { MoreMenuComponent } from '../components/more-menu/more-menu';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { FirebaseProvider } from '../providers/firebase';
import { UserProvider } from '../providers/user.service';
import { ProductService } from '../providers/products.service';
import { InventoryService } from '../providers/inventory.service';
import { ToastService } from '../providers/toast.service';

import { ProductsFilter } from '../pipes/products-filter.pipe';
import { UserProductFilter } from '../pipes/user-product-filter.pipe';
import { OrderByDatePipe } from '../pipes/orderby-date.pipe';

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
    MorePage,
    AddProductModalComponent,
    MoreMenuComponent,
    ProductsFilter,
    UserProductFilter,
    OrderByDatePipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireOfflineModule,
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
    MorePage,
    AddProductModalComponent,
    MoreMenuComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseProvider,
    UserProvider,
    ProductService,
    InventoryService,
    ToastService
  ]
})
export class AppModule {}
