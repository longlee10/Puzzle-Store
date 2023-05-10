import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, map, switchMap } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  products$;
  category;
  subscription: Subscription;
  filteredProduct;
  cart: any;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService
  ) {
    this.subscription = productService
      .getAll()
      .subscribe((p) => (this.filteredProduct = this.products$ = p));

    route.queryParamMap.subscribe((params) => {
      this.category = params.get('category');

      productService
        .getAll()
        .pipe(
          map((products) => {
            return products.filter(
              (p) => p.payload.val().category === this.category
            );
          })
        )
        .subscribe((p) => {
          this.category
            ? (this.filteredProduct = p)
            : (this.filteredProduct = this.products$);
        });
    });
  }

  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCart())
      .valueChanges()
      .subscribe((cart) => {
        this.cart = cart;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
