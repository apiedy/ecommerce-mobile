import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { ProductService } from '../../providers/products.service';
import { InventoryService } from '../../providers/inventory.service';
import { UserProvider } from '../../providers/user.service';

import { ProductListing } from '../../models/productListing';
import { InventoryItem } from '../../models/inventoryItem';
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
  public isTradeListing: boolean;
  public tradeValid: boolean;

  private mode: string;
  private listingMode: string;
  private loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public prodService: ProductService, public invService: InventoryService, public userService: UserProvider, public loadingCtrl: LoadingController) {
    this.product = this.navParams.get('product');
    this.mode = this.navParams.get('mode');
    this.listingMode = this.navParams.get('listingMode');
    this.showBuyContent = (this.mode === CONST.buy);
    this.showEditContent = (this.mode === CONST.edit);
    this.isTradeListing = this.listingMode === CONST.trade;
    this.createForm();
  }

  private createForm() {
    if(this.showEditContent) {
      this.editForm = this.formBuilder.group({
        name: [this.product.name, Validators.required],
        price: [this.product.price, Validators.required],
        quantity: [this.product.number, Validators.required]
      });
      if(this.listingMode === CONST.trade) {
        this.editForm.addControl('tradeFor', new FormControl(this.product.tradeFor, Validators.required));
        this.editForm.removeControl('price');
      }
    }
    else if(this.showBuyContent) {
      this.buyForm = this.formBuilder.group({
        quantity: [0, Validators.required]
      });
      this.tradeValid = this.product.number > 0;
    }
  }

  public edit() {
    const newProductVal = this.listingMode !== CONST.trade 
                          ? new ProductListing(
                            this.editForm.value.name,
                            this.editForm.value.quantity,
                            this.product.seller,
                            this.editForm.value.price
                          )
                          : new ProductListing(
                            this.editForm.value.name,
                            this.editForm.value.quantity,
                            this.product.seller,
                            null,
                            this.editForm.value.tradeFor
                          );
                          
    this.prodService.updateProduct(newProductVal, this.product.$key);
  }

  public remove() {
    this.createLoader();
    this.loading.present();
    this.prodService.removeProduct(this.product);
    this.loading.dismiss();
    this.navCtrl.pop();
  }

  public buy() {
    const buyingNumber = this.buyForm.value.quantity;
    const newNumber = this.product.number - buyingNumber;
    const newProdVal = new ProductListing(
      this.product.name,
      newNumber,
      this.product.seller,
      this.product.price,
      null
    );

    const invItem = new InventoryItem(
      this.product.name,
      buyingNumber,
      this.userService.getCurrentUser()['username'],
      new Date().toISOString()
    );

    this.createLoader();
    this.loading.present();
    this.prodService.updateProduct(newProdVal, this.product.$key);
    this.invService.addItem(invItem);
    this.loading.dismiss();
    this.navCtrl.pop();
  }

  public calcTotal() {
    this.total = this.buyForm.value.quantity * this.product.price;
  }

  public trade() {
    const newProdVal = new ProductListing(
      this.product.name,
      this.product.number - 1,
      this.product.seller,
      null,
      this.product.tradeFor
    );

    const invItem = new InventoryItem(
      this.product.name,
      1,
      this.userService.getCurrentUser()['username'],
      new Date().toISOString()
    );

    this.createLoader();
    this.loading.present();
    this.prodService.updateProduct(newProdVal, this.product.$key);
    this.invService.addItem(invItem);
    this.loading.dismiss();
    this.navCtrl.pop();
  }

  private createLoader() {
    this.loading = this.loadingCtrl.create({
      content: CONST.loadingText,
      spinner: CONST.loadingSpinner
    });
  }
}
