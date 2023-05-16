import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  SnapshotAction,
} from '@angular/fire/compat/database';
import { Product } from '../models/product';
import { Subscription, map, take } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  subscription: Subscription;

  constructor(private db: AngularFireDatabase) {}

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime(),
    });
  }

  async getCart() {
    let cartId = await this.getOrCreateCardId();
    return this.db.object<ShoppingCart>('/shopping-carts/' + cartId);
  }

  private async getOrCreateCardId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');

    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  async addToCart(product) {
    this.updateQuantity(product, 1);
  }

  removeFromCart(product) {
    this.updateQuantity(product, -1);
  }

  private async updateQuantity(product, change: number) {
    let cartId = await this.getOrCreateCardId();
    let item$ = this.getItem(cartId, product.key);

    this.subscription = item$
      .valueChanges()
      .pipe(take(1))
      .subscribe((item: any) => {
        if (item) {
          item$.update({ quantity: item.quantity + change });
        } else item$.set({ product: product.payload.val(), quantity: 1 });
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
