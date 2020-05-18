import { Component, OnInit } from '@angular/core';
import { CartStore } from '@core/cart/cart-store';
import { Observable } from 'rxjs';
import { getCartSubTotal, getCartItemsCount, getShippingCost, getEstimatedTax, getOrderTotal } from '@core/cart/cart-selector';

@Component({
  selector: 'sw-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss']
})
export class CartSummaryComponent implements OnInit {

  cartSubTotal : Observable<number>;
  cartItemsCount : Observable<number>;
  shippingCost : Observable<number>;
  estimatedTax : Observable<number>;
  orderTotal : Observable<number>;
  constructor(private cartSore: CartStore) { }

  ngOnInit(): void {
    this.cartSubTotal = this.cartSore.select(getCartSubTotal);
    this.cartItemsCount = this.cartSore.select(getCartItemsCount);
    this.shippingCost = this.cartSore.select(getShippingCost);
    this.estimatedTax = this.cartSore.select(getEstimatedTax);
    this.orderTotal = this.cartSore.select(getOrderTotal);
  }

}
