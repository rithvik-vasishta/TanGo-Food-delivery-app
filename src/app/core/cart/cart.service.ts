import { Injectable } from "@angular/core";
import { LogService } from "@core/log.service";
import { Product } from "@core/products/product";
import { of } from "rxjs";
import { CartStore } from "./cart-store";

@Injectable({
  providedIn: "root",
})
export class CartService {
  constructor(private logService: LogService, private cartStore: CartStore) {}

  addToCart(product: Product, quantity: number) {
    this.logService.log("[Cart] Add Item");
    const cartItemToAdd = {
      ...product,
      quantity,
      itemTotal: product.price * quantity,
    };
    this.cartStore.addCartItem(cartItemToAdd);
    return of(cartItemToAdd);
  }
}
