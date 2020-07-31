import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from './models/Products';
import { take } from 'rxjs/operators';
import { ShoppingCartItem } from './models/shopping-cart-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  create(){
   return this.db.list('/shopping-cart').push({
      dateCreated: new Date().getTime()
    })
  }
  
  private getCart(cartId: string){
    return this.db.object('/shopping-cart/'+cartId);
  }

  private getItem(cartId: string, productId: string){
   return this.db.object('/shopping-cart/' + cartId + '/items/' + productId);
  }
  private async  getOrCreateCartId(){ 
    let cartId= localStorage.getItem('cartId');  
    if(cartId) return cartId; 

    let result = await this.create();
    localStorage.setItem('cartId', result.key );
    return result.key;   
  }

  async addToCart(product: Product, change : number){
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId,product.key);

    item$
        .valueChanges()
        .pipe(take(1))
        .subscribe((item: ShoppingCartItem) => { 
          //if exist or not  update, as it wont make much diff in firebase 
          item$.update({product: product, quantity: (item? (item.quantity || 0): 0) + 1 }); 
    });

  }
}
