import { ShoppingCart } from './shopping-cart';
import { ShippingAddress } from './shipping-address';

export class Order{

    datePlaced: number;
    items: any[];
    shipping: ShippingAddress;

    constructor( public userId: string, shipping: ShippingAddress, shoppingCart: ShoppingCart){
        this.datePlaced = new Date().getTime();
        this.shipping=shipping;
        this.items = shoppingCart.items.map(i => {
            return {
              product: {
                title: i.title,
                imageUrl: i.imageUrl,
                price: i.price
              },
              quantity: i.quantity,
              totalProce: i.totalPrice
            }
          })

    }
}