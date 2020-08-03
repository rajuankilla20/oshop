import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from './models/Products';
import { take, map } from 'rxjs/operators';
import { ShoppingCartItem } from './models/shopping-cart-item';
import { Observable } from 'rxjs';
import { ShoppingCart } from './models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

    async getCart(): Promise<Observable<ShoppingCart>>{
      let cartId = await this.getOrCreateCartId();
      return this.db.object('/shopping-cart/' + cartId).snapshotChanges()
            .pipe(map(x => new ShoppingCart(x.payload.exportVal().items)));
    }

    async addToCart(product: Product){
      this.updateItemQuantity(product, 1);
    }

  async removeFromCart(product: Product){
    this.updateItemQuantity(product, -1);
  }

 async  clearCart() {
    let cartId = await this.getOrCreateCartId();
    console.log('-----cart id : ' + cartId)
    this.db.object('/shopping-cart/' + cartId + '/items').remove();
  }

  private create(){
    return this.db.list('/shopping-cart').push({
      dateCreated: new Date().getTime()
    })
  }


  private getItem(cartId: string, productId: string){
    return this.db.object('/shopping-cart/' + cartId + '/items/' + productId);
  }

  private async  getOrCreateCartId(): Promise<string>{ 
    let cartId= localStorage.getItem('cartId');  
    if(cartId) return cartId; 

    let result = await this.create();
    localStorage.setItem('cartId', result.key );
    return result.key;   
  }

  
 private async updateItemQuantity(product: Product, change: number){
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId,product.key);
    item$
    .valueChanges()
    .pipe(take(1))
    .subscribe((item: ShoppingCartItem) => { 
      //if exist or not  update, as it wont make much diff in firebase 
      const quantity = (item ? (item.quantity || 0) : 0) + change; // Used || to avoid null reference error

      if(quantity === 0) item$.remove()
      else item$.update({
        title: product.title,
        category: product.category,
        imageUrl: product.imageUrl,
        price: product.price, 
        quantity: quantity  
      }); 
    }); 
  }
}
