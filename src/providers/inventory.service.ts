import { Injectable } from '@angular/core';
import { AngularFireOfflineDatabase } from 'angularfire2-offline/database';

@Injectable()
export class InventoryService {

  constructor(public db: AngularFireOfflineDatabase) { }

  public getItems() {
    return this.db.list('/inventory/')
  }

  public addItem(item) {
    this.db.list('/inventory/').push(item);
  }
}
