import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Order } from '../models/order';
import { ShoppingCart } from '../models/shopping-cart';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { OrderService } from '../order.service';
import { Subscription } from 'rxjs';
import { ShippingAddress } from '../models/shipping-address';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss']
})
export class ShippingFormComponent implements OnInit, OnDestroy {

 @Input('cart') cart: ShoppingCart;
 
  shipping = new ShippingAddress();   
  userId: string;
  userSubscription: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService, 
    private orderService: OrderService)  { 
    this.userSubscription= this.authService.user$.subscribe(user => this.userId = user.uid)
  }

  ngOnInit(): void {
  }

  async placeOrder(){
      console.log(this.shipping);     
      let order = new Order(this.userId, this.shipping,this.cart);
      let result = await this.orderService.placeOrder(order);     
      this.router.navigate(['/order-success', result.key ]);
  }


  ngOnDestroy(){
    this.userSubscription.unsubscribe();
 }

}
