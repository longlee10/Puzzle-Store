import { Component } from '@angular/core';
import { map } from 'rxjs';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent {
  itemCount: number;
  items = [];
  totalPrice: number;
  // productIds;
  cart;

  constructor(private cartService: ShoppingCartService) {}

  async ngOnInit() {
    let cart$ = (await this.cartService.getCart())
      .valueChanges()
      // .pipe(
      //   map((cart) =>
      //     Array(cart).filter((p) => {
      //       console.log(p.payload.val().items[this.productIds]);
      //       p.payload.val().items[this.productIds].quantity < 0;
      //     })
      //   )
      // )
      .subscribe((cart: any) => {
        this.cart = cart;
        console.log(cart);
        this.itemCount = 0;
        this.totalPrice = 0;
        for (let productId in cart.items) {
          this.itemCount += cart.items[productId].quantity;

          this.totalPrice +=
            cart.items[productId].quantity *
            cart.items[productId].product.price;

          this.items.push(cart.items[productId]);
          // this.productIds = Object.keys(cart.items);
        }
      });
  }
}
