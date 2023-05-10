import { Component } from '@angular/core';
import { AngularFireObject } from '@angular/fire/compat/database';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent {
  categories$;
  product;
  key;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoriesService: CategoriesService,
    private productService: ProductService
  ) {
    this.categories$ = categoriesService.getAll();
    this.key = this.route.snapshot.paramMap.get('key');

    this.productService.get(this.key).subscribe((p) => {
      this.product = p;
      console.log(this.product);
    });
  }

  // https://stackoverflow.com/questions/50313778/two-way-binding-showing-in-angular5-showing-typeerror-cannot-read-property-tit

  save(product: Object) {
    if (this.key) this.productService.update(this.key, product);
    else this.productService.create(product);

    this.router.navigate(['/admin/manage-products']);
  }

  delete() {
    if (!confirm('Are you sure wanting to delete this product?')) return;

    this.productService.delete(this.key);
    this.router.navigate(['/admin/manage-products']);
  }
}
