import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';import { CategoryService } from 'shared/services/category.service';
import { ProductService } from 'shared/services/product.service'; 

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent   {

  categories$;
  product = { };
  id;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoriesService: CategoryService, 
    private productService: ProductService) {

    this.categories$ = categoriesService.getCategories().snapshotChanges();
    this.id = this.route.snapshot.paramMap.get('id');    
    if (this.id) this.productService.get(this.id).pipe(take(1)).subscribe( p => this.product = p);

   } 

   save(product){
     if(this.id) this.productService.update(this.id, product);
     else this.productService.create(product); 

     this.router.navigate(['/admin/products']);
   }
   
   delete(){
     if(!confirm('Are you sure, you want to delete this product?')) return;

     this.productService.delete(this.id);
     this.router.navigate(['/admin/products']);
   }

}
