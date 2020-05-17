import { Injectable } from '@angular/core';
import { Store } from '@core/store';
import { CartState, initialState } from './cart-state';

@Injectable({ providedIn: 'root'})
export class CartStore extends Store<CartState> {
    
    constructor(){
        super(initialState);
    }

    addCartItem(cartItemToAdd: import("./cart-item").CartItem) {
        console.log('[cart] add cartItem');
        const newState = {
            ...this.state,   //cartItems
            cartItems: [].concat(this.state.cartItems,cartItemToAdd)
            
        };

        this.setState(newState);
    }
}
