import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the AddProductModalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'add-product-modal',
  templateUrl: 'add-product-modal.html'
})
export class AddProductModalComponent {

  title: string;
  addProductForm;

  constructor(public viewCtrl: ViewController, public formBuilder: FormBuilder) {
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
}
