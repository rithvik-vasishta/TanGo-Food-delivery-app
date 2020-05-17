import { CartStore } from './cart-store';
import { TestBed } from '@angular/core/testing';
import { initialState, CartState } from './cart-state';
import { CartItem } from './cart-item';

describe('CartStore', () => {

  let cartStore : CartStore;

  beforeEach(()=>{
    TestBed.configureTestingModule({
      providers:[CartStore]
    });

    cartStore = TestBed.get(CartStore)
  });

  it('should create an instance', () => {
    expect(cartStore).toBeTruthy();
  });

  it('can add item into cart state)',()=>{
    const currentState = initialState;
    expect(currentState.cartItems.length).toBe(0);

    const cartItem: CartItem = {
      productId:1,
      imgUrl:'img/apple',
      price:2,
      quantity:10,
      itemTotal:20,
      name:'apple'
    };

    cartStore.addCartItem(cartItem);

    const expectedState ={
      cartItems:[cartItem]
    };

    expect(cartStore.state).toEqual(expectedState);
  });


  it('can clear cart ',()=>{
      const cartItem: CartItem = {
      productId:1,
      imgUrl:'img/apple',
      price:2,
      quantity:10,
      itemTotal:20,
      name:'apple'
    };

    cartStore.addCartItem(cartItem)

    const currentState ={
      cartItems:[cartItem]
    };

    expect(cartStore.state).toEqual(currentState);


    cartStore.clearCart();


    expect(cartStore.state).toEqual(initialState);

  });


  it('can restore cart ',()=>{

    const currentState=initialState;  

    expect(cartStore.state).toEqual(currentState);
    const cartItem: CartItem = {
      productId:1,
      imgUrl:'img/apple',
      price:2,
      quantity:10,
      itemTotal:20,
      name:'apple'
    };
    const expectedState: CartState = {
      cartItems: [cartItem]
    };

    cartStore.restoreCart(expectedState);

    expect(cartStore.state).toEqual(expectedState);

});


it('can remove cart ',()=>{

  const cartItem: CartItem = {
    productId:2,
    imgUrl:'img/apple',
    price:2,
    quantity:10,
    itemTotal:20,
    name:'apple'
  };

  const cartItem1: CartItem = {
    productId:1,
    imgUrl:'img/orange',
    price:20,
    quantity:100,
    itemTotal:200,
    name:'orange'
  };
  const currentState: CartState = {
    cartItems: [cartItem, cartItem1]
  };

  cartStore.restoreCart(currentState);

  expect(cartStore.state).toEqual(currentState);


  cartStore.removeCartItem(cartItem);

  const expectedState: CartState = {
    cartItems: [cartItem1]
  }

  expect(cartStore.state).toEqual(expectedState);

});

it('can update cart ',()=>{

  const cartItem: CartItem = {
    productId:1,
    imgUrl:'img/apple',
    price:2,
    quantity:10,
    itemTotal:20,
    name:'apple'
  };

  const cartItem1: CartItem = {
    productId:2,
    imgUrl:'img/orange',
    price:20,
    quantity:100,
    itemTotal:200,
    name:'orange'
  };
  const currentState: CartState = {
    cartItems: [cartItem, cartItem1]
  };

  cartStore.restoreCart(currentState);

  expect(cartStore.state).toEqual(currentState);

  const cartItemToUpdate: CartItem = {
    productId:2,
    imgUrl:'img/orange',
    price:20,
    quantity:110,
    itemTotal:330,
    name:'orange'
  };
  cartStore.updateCartItem(cartItemToUpdate);

  const expectedState: CartState = {
    cartItems: [cartItem,cartItemToUpdate]
  }

  expect(cartStore.state).toEqual(expectedState);

});
});
