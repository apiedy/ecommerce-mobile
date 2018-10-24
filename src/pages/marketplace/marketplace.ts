import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AfoListObservable } from 'angularfire2-offline/database';
import 'rxjs/add/operator/map';

import { ProductService } from '../../providers/products.service';
import { ProductPage } from  '../product/product';
import { CONST } from '../../shared/constants';

@Component({
  selector: 'page-marketplace',
  templateUrl: 'marketplace.html'
})
export class MarketplacePage {
  productList: AfoListObservable<any[]>;
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
