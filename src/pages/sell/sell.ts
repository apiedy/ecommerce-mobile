import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { AfoListObservable } from 'angularfire2-offline/database';

import { ProductService } from '../../providers/products.service';

import { AddProductModalComponent } from '../../components/add-product-modal/add-product-modal';
import { ProductPage } from '../product/product';

import { CONST } from '../../shared/constants';

@Component({
  selector: 'page-sell',
  templateUrl: 'sell.html'
})
export class SellPage {
  public productList: AfoListObservable<any[]>;
  private addproductModal;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public productService: ProductService) {
    this.productList = this.productService.getProducts();
    this.addproductModal = this.modalCtrl.create(AddProductModalComponent);
  }

  public openModal() {
    this.addproductModal.present();
  }

  public showProductPage(product) {
    const params = {
      product: product,
      mode: CONST.edit,
      listingMode: product.price ? CONST.buy : CONST.trade
    }
    this.navCtrl.push(ProductPage, params);
  }
}
