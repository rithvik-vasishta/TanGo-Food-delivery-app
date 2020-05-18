import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { getIsItemAlreadyInCart } from "@core/cart/cart-selector";
import { CartStore } from "@core/cart/cart-store";
import {
  ALLOWED_PRODUCT_QUANTITIES,
  CartService,
} from "@core/cart/cart.service";
import { Product } from "@core/products/product";
import { Observable } from "rxjs";

@Component({
  selector: "sw-add-to-cart",
  templateUrl: "./add-to-cart.component.html",
  styleUrls: ["./add-to-cart.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddToCartComponent implements OnInit {
  @Input() product: Product;
  availableQuantities: number[];
  quantity: number;
  isItemAlreadyInCart: Observable<boolean>;

  constructor(private cartStore: CartStore, private cartService: CartService) {}

  ngOnInit() {
    this.availableQuantities = ALLOWED_PRODUCT_QUANTITIES;
    this.isItemAlreadyInCart = this.cartStore.select(
      getIsItemAlreadyInCart(this.product.id)
    );
    this.quantity = 1;
  }

  addItemToCart() {
    this.cartService
      .addToCart(this.product, this.quantity)
      .subscribe((cartItem) => console.log("added to cart", cartItem));
  }
}