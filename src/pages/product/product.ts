import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {
  product;
  mode;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.product = this.navParams.get('product');
    this.mode = this.navParams.get('mode');
    console.log("prod", this.product)
    console.log("mode", this.mode)
  }
}
