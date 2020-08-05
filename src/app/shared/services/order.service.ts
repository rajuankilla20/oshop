import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Order } from 'shared/models/order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
      private db: AngularFireDatabase,
      private shoppingCartService: ShoppingCartService) { }

  async placeOrder(order: Order){  
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;    
  }

  getOrders(){
   return this.db.list('/orders').valueChanges();
  }
 
  getOrdersByUserId(userId: string){
    console.log('logged in user-----> '+ userId)
    return this.db.list('/orders', query=> query.orderByChild('userId').equalTo(userId))
        .valueChanges();
  }
 
}
