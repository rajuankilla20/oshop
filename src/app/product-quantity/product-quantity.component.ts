import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/Products';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.scss']
})
export class ProductQuantityComponent {

@Input('product') product : Product;
@Input('shopping-cart') shoppingCart : ShoppingCart; 

constructor(private cartService: ShoppingCartService) { } 

  addToCart(){  
    this.cartService.addToCart(this.product); 
  } 

  removeFromCart(){
    this.cartService.removeFromCart(this.product);
  } 
}