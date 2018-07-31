import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ProductService } from '../../providers/products.service';

import { ProductListing } from '../../models/productListing';
import { CONST } from '../../shared/constants';

@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {
  public product;
  public showBuyContent: boolean;
  public showEditContent: boolean;
  public total: number = 0;
  public editForm: FormGroup;
  public buyForm: FormGroup;

  private mode: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public prodService: ProductService) {
    this.product = this.navParams.get('product');
    this.mode = this.navParams.get('mode');
    this.showBuyContent = (this.mode === CONST.buy);
    this.showEditContent = (this.mode === CONST.edit);
    this.createForm();
  }

  private createForm() {
    if(this.showEditContent) {
      this.editForm = this.formBuilder.group({
        name: [this.product.name, Validators.required],
        price: [this.product.price, Validators.required],
        quantity: [this.product.number, Validators.required]
      });
    }
    else if(this.showBuyContent) {
      this.buyForm = this.formBuilder.group({
        quantity: [0, Validators.required]
      });
    }
  }

  public edit() {
    const newProductVal = new ProductListing(
      this.editForm.value.name,
      this.editForm.value.price,
      this.editForm.value.quantity,
      this.product.seller
    );
    this.prodService.updateProduct(newProductVal, this.product.$key);
  }

  public remove() {
    this.prodService.removeProduct(this.product);
    this.navCtrl.pop();
  }

  public buy() {
    const buyingNumber = this.buyForm.value.quantity;
    const newNumber = this.product.number - buyingNumber;
    const newProdVal = new ProductListing(
      this.product.name,
      this.product.price,
      newNumber,
      this.product.seller
    );

    this.prodService.updateProduct(newProdVal, this.product.$key);
    this.navCtrl.pop();
  }

  public calcTotal() {
    this.total = this.buyForm.value.quantity * this.product.price;
  }
}
