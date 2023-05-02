import { Component, Input } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css'],
})
export class ProductFilterComponent {
  categories$;
  @Input('category') category;

  constructor(private categoryService: CategoriesService) {
    this.categories$ = categoryService.getAll();
  }
}
