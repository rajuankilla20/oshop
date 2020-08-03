import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../shopping-cart.service';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Order } from '../models/order';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit, OnDestroy {

  shipping={}; 
  cart: ShoppingCart;
  userId: string;
  cartSubscription: Subscription;
  userSubscription: Subscription;

  constructor(
      private  router: Router,
      private authService: AuthService,
      private shoppingCartService: ShoppingCartService,
      private orderService: OrderService) { }
 
  async ngOnInit(){
    let cart$ = await this.shoppingCartService.getCart();
    this.cartSubscription = cart$.subscribe(cart => {
        this.cart = cart;
      })
   this.userSubscription= this.authService.user$.subscribe(user => this.userId = user.uid);  
  }

  async placeOrder(){
    console.log(this.shipping);
     
    let order = new Order(this.userId, this.shipping,this.cart);
    let result = await this.orderService.storeOrder(order);    

    this.router.navigate(['/order-success', result.key ]);

  }
  
 ngOnDestroy(){
   this.cartSubscription.unsubscribe();
   this.userSubscription.unsubscribe();
 }
}
