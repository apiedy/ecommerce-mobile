import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class InventoryService {

  constructor(public db: AngularFireDatabase) { }

  public getItems() {
    return this.db.list('/inventory/')
  }

  public addItem(item) {
      this.db.list('/inventory/').push(item);
  }
}
