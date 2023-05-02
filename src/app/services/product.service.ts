import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private db: AngularFireDatabase) {}

  create(product) {
    this.db.list('/products').push(product);
  }

  getAll() {
    return this.db.list<Product>('/products').snapshotChanges();
  }

  get(productKey: string) {
    return this.db.object('/products/' + productKey);
  }

  update(productKey, product) {
    return this.db.object('/products/' + productKey).update(product);
  }

  delete(productKey) {
    return this.db.object('/products/' + productKey).remove();
  }
}
