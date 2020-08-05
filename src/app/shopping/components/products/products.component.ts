import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Product } from 'shared/models/Products';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ProductService } from 'shared/services/product.service'; 
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent  implements OnInit{

  products: Product[]=[];   
  filteredProducts: Product[]=[];   
  subscription: Subscription;
  category: string;
  cart$ : Observable<ShoppingCart>; 

  constructor(
      private route: ActivatedRoute,
      private productService: ProductService,
      private shoppingCartService: ShoppingCartService
     ) {  
      
     
   }


  async ngOnInit(){
      this.cart$=await this.shoppingCartService.getCart();
      this.populateProducts();
  }
 

  private populateProducts(){
    this.productService.getAll<Product>()
      .pipe(switchMap(products => {
        this.products = products;
        return this.route.queryParamMap;}))
      .subscribe(params => {
        this.category = params.get('category');  
        this.applyFilter(); 
      });
  }

  private applyFilter(){
    this.filteredProducts = (this.category)?
    this.products.filter(p => p.category.toLowerCase().includes(this.category.toLowerCase())):
    this.products; 
  }
}
