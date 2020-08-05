import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Order } from 'shared/models/order';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Router } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';
import { Subscription, of } from 'rxjs';
import { ShippingAddress } from 'shared/models/shipping-address';

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
    this.userSubscription= this.authService.user$.subscribe(user => {
      if(user) 
        return this.userId = user.uid;
      else 
        return of(null);  
    })
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
