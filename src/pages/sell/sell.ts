import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';

import { UserProvider } from '../../providers/user.service';
import { ProductService } from '../../providers/products.service';
import { AddProductModalComponent } from '../../components/add-product-modal/add-product-modal';

@Component({
  selector: 'page-sell',
  templateUrl: 'sell.html'
})
export class SellPage {
  public productList: FirebaseListObservable<any[]>;
  private addproductModal;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public userService: UserProvider, public productService: ProductService) {
    this.productList = this.productService.getProducts();
    this.addproductModal = this.modalCtrl.create(AddProductModalComponent);
  }

  public openModal() {
    this.addproductModal.present();
  }

  public showProductPage(product) {
    console.log(product);
  }

  ionViewDidLoad() {
    console.log(this.userService.getCurrentUser())
  }
}
