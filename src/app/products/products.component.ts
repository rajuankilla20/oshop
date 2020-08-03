import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/Products';
import { Subscription, Observable } from 'rxjs';
import { CategoryService } from '../category.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { map } from 'rxjs/operators';
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
