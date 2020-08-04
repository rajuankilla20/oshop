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
export class CheckOutComponent implements OnInit {

  cart$  : Observable<ShoppingCart>;   

  constructor(private shoppingCartService: ShoppingCartService ) { }
 
  async ngOnInit(){
    this.cart$ = await this.shoppingCartService.getCart(); 
  } 
}
