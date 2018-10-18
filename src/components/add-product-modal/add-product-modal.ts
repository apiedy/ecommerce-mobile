import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserProvider } from '../../providers/user.service';
import { ProductService } from '../../providers/products.service';
import { ToastService } from '../../providers/toast.service';

import { ProductListing } from '../../models/productListing';

import { CONST } from '../../shared/constants';

@Component({
  selector: 'add-product-modal',
  templateUrl: 'add-product-modal.html'
})
export class AddProductModalComponent {

  public title: string;
  public listingMode: string = 'sell';
  public addProductForm: FormGroup;
  public tradeProductForm: FormGroup;

  constructor(public viewCtrl: ViewController, public formBuilder: FormBuilder, public userService: UserProvider, public prodService: ProductService, public toastService: ToastService) {
    this.title = 'Add Product';
    this.createForms();
  }

  private createForms() {
    this.addProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      number: ['', Validators.required]
    });

    this.tradeProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      tradeFor: ['', Validators.required]
    });
  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }

  public addProduct() {
    const seller = this.userService.getCurrentUser()['username'];
    const product = this.listingMode === CONST.sell.toLowerCase() 
                    ? new ProductListing(this.addProductForm.value.name, this.addProductForm.value.number, seller, this.addProductForm.value.price, null)
                    : new ProductListing(this.tradeProductForm.value.name, 1, seller, null, this.tradeProductForm.value.tradeFor);

    this.prodService.addProduct(product);
    const toastMessage = this.listingMode === CONST.sell.toLowerCase()
                          ? 'The product has been successfully listed for sale.'
                          : 'The product has been successfully listed for trade.'; 
    const toast = this.toastService.createToast(toastMessage, 'Ok');
    this.toastService.openToast(toast, true);
    this.dismiss();
  }
}
