import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';

import { ProductService } from '../../providers/products.service';

@Component({
  selector: 'page-buy',
  templateUrl: 'buy.html'
})
export class BuyPage {
  productList: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, public prodService: ProductService) {
    this.productList = this.prodService.getProducts();
  }

  public showProductPage(product) {
    console.log(product)
  }

}
