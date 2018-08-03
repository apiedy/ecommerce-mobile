import { Injectable } from '@angular/core';
import { AngularFireOfflineDatabase } from 'angularfire2-offline/database';

@Injectable()
export class ProductService {
    constructor(private db: AngularFireOfflineDatabase) { 
    }

    public getProducts() {
        return this.db.list('/products/')
    }

    public addProduct(product) {
        this.db.list('/products/').push(product);
    }

    public removeProduct(product) {
        this.db.list('/products/').remove(product);
    }

    public updateProduct(product, key) {
        this.db.object('/products/'+ key).update(product);
    }
}
