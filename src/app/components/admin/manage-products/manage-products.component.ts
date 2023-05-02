import { Component } from '@angular/core';
import { Subscription, map } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css'],
})
export class ManageProductsComponent {
  products$;
  // filteredProduct: any[];
  subscription: Subscription;

  constructor(private productService: ProductService) {
    this.subscription = productService
      .getAll()
      .subscribe((p) => (this.products$ = p));
  }

  filter(queryValue: string) {
    this.productService
      .getAll()
      .pipe(
        map((products) =>
          products.filter((p) =>
            p.payload
              .val()
              .title.toLowerCase()
              .includes(queryValue.toLowerCase())
          )
        )
      )
      .subscribe((p) => (this.products$ = p));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /*https://www.youtube.com/watch?v=71UxmmMaozU 
  filtering observables in angular
  */
}
