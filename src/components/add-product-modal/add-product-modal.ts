import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserProvider } from '../../providers/user.service';
import { ProductService } from '../../providers/products.service';

import { ProductListing } from '../../models/productListing';

@Component({
  selector: 'add-product-modal',
  templateUrl: 'add-product-modal.html'
})
export class AddProductModalComponent {

  title: string;
  addProductForm: FormGroup;

  constructor(public viewCtrl: ViewController, public formBuilder: FormBuilder, public userService: UserProvider, public prodService: ProductService) {
    this.title = 'Add Product';
    this.createForm();
  }

  private createForm() {
    this.addProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      number: ['', Validators.required]
    });
  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }

  public addProduct() {
    const seller = this.userService.getCurrentUser()['username'];

    const product = new ProductListing(this.addProductForm.value.name, this.addProductForm.value.price, this.addProductForm.value.number, seller);

    console.log(product);
    this.prodService.addProduct(product);
    this.dismiss();
  }
}
