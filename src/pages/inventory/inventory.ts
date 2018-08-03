import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AfoListObservable } from 'angularfire2-offline/database';

import { InventoryService } from '../../providers/inventory.service';

@Component({
  selector: 'page-inventory',
  templateUrl: 'inventory.html'
})
export class InventoryPage {
  public inventory: AfoListObservable<any[]>;

  constructor(public navCtrl: NavController, public invService: InventoryService) {
    this.inventory = this.invService.getItems();
  }
}
