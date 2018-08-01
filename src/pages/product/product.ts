import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ProductService } from '../../providers/products.service';
import { InventoryService } from '../../providers/inventory.service';
import { UserProvider } from '../../providers/user.service';

import { ProductListing } from '../../models/productListing';
import { CONST } from '../../shared/constants';
import { InventoryItem } from '../../models/inventoryItem';

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
  private listingMode: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public prodService: ProductService, public invService: InventoryService, public userService: UserProvider) {
    this.product = this.navParams.get('product');
    this.mode = this.navParams.get('mode');
    this.listingMode = this.navParams.get('listingMode');
    this.showBuyContent = (this.mode === CONST.buy);
    this.showEditContent = (this.mode === CONST.edit && this.listingMode === CONST.buy);
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
      newNumber,
      this.product.seller,
      this.product.price
    );

    const invItem = new InventoryItem(
      this.product.name,
      buyingNumber,
      this.userService.getCurrentUser()['username'],
      new Date().toISOString()
    );

    this.prodService.updateProduct(newProdVal, this.product.$key);
    this.invService.addItem(invItem);
    this.navCtrl.pop();
  }

  public calcTotal() {
    this.total = this.buyForm.value.quantity * this.product.price;
  }
}
