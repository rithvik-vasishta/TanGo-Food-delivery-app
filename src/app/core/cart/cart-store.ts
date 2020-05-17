import { Injectable, ɵɵstaticContentQuery } from '@angular/core';
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

    clearCart() {
        console.log('[cart] clear cartItem');
        const newState = initialState;

        this.setState(newState);
      }

      restoreCart(stateToRestore: CartState) {
        console.log('[cart] restore cartItem');
        this.setState(stateToRestore)
      }

      removeCartItem(cartItemToRemove: import("./cart-item").CartItem) {
        console.log('[cart] remove cartItem');
        const newState = {
            ...this.state,   //cartItems
            cartItems: this.state.cartItems.filter(cartItem=> cartItem.productId != cartItemToRemove.productId)
            
        };

        this.setState(newState);
      }  

      updateCartItem(cartItemToUpdate: import("./cart-item").CartItem) {
        console.log('[cart] update cartItem');
        const newState = {
            ...this.state,   //cartItems
            cartItems: this.state.cartItems.map(cartItem=> 
                cartItem.productId == cartItemToUpdate.productId 
                ? cartItemToUpdate
                : cartItem)
            
        };

        this.setState(newState);
      }
}
