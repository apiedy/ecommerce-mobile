import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';

import { InventoryService } from '../../providers/inventory.service';

@Component({
  selector: 'page-inventory',
  templateUrl: 'inventory.html'
})
export class InventoryPage {
  public inventory: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, public invService: InventoryService) {
    this.inventory = this.invService.getItems();
  }
}
