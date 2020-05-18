import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartStore } from '@core/cart/cart-store';
import { getCartItemsCount } from '@core/cart/cart-selector';

@Component({
  selector: 'sw-cart-items-count',
  templateUrl: './cart-items-count.component.html',
  styleUrls: ['./cart-items-count.component.scss'],
})
export class CartItemsCountComponent implements OnInit {
  totalItemsInCart$: Observable<number>;
  constructor(private cartStore: CartStore) { }

  ngOnInit(): void {
    this.totalItemsInCart$ = this.cartStore.select(getCartItemsCount);
  }

}
