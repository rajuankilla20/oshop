import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/Products';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartItem } from '../models/shopping-cart-item';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input('product') product : Product;
  @Input('show-actions') showActions= true;
  @Input('shopping-cart') shoppingCart : ShoppingCart;

  item: ShoppingCartItem;

  constructor(private cartService: ShoppingCartService) { } 

  addToCart(product: Product){  
    this.cartService.addToCart(product,1); 
  }

  getQuantity(){  
    if(!this.shoppingCart) return 0;    
    
    return this.shoppingCart.getQuantity(this.product);  
  }
}
