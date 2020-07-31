import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/Products';
import { Subscription } from 'rxjs';
import { CategoryService } from '../category.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent  {
  categories$;
  products: Product[]=[];   
  filteredProducts: Product[]=[];   
  subscription: Subscription;
  category: string;

  constructor(
      route: ActivatedRoute,
      productService: ProductService,
      categoriesService: CategoryService) {  
 
       productService.getAll<Product>()
                    .pipe(switchMap(products => {
                      this.products = products;
                      return route.queryParamMap;
                    }))
                    .subscribe(params => {
                      this.category = params.get('category');  

                      this.filteredProducts = (this.category)?
                            this.products.filter(p => p.category.toLowerCase().includes(this.category.toLowerCase())):
                            this.products; 
                  });

      this.categories$ = categoriesService.getCategories().snapshotChanges();

   }
  

}
