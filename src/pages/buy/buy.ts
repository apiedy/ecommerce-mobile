import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';
import 'rxjs/add/operator/map';

import { ProductService } from '../../providers/products.service';

import { ProductPage } from  '../product/product';

import { CONST } from '../../shared/constants';

@Component({
  selector: 'page-buy',
  templateUrl: 'buy.html'
})
export class BuyPage {
  productList: FirebaseListObservable<any[]>;
  public listingMode: string = 'buy';

  constructor(public navCtrl: NavController, public prodService: ProductService) {
    this.productList = this.prodService.getProducts();
  }

  public showProductPage(product) {
    const params = {
      product: product,
      mode: CONST.buy,
      listingMode: this.listingMode.toUpperCase()
    }
    this.navCtrl.push(ProductPage, params);
  }
}
