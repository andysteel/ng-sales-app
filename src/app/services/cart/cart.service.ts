import { Injectable, signal } from "@angular/core";
import { CartItem } from "./cart-item.dto";

@Injectable({
  providedIn: "root",
})
export class CartService {
  readonly CART: string = "cart";
  readonly CART_QUANTITY: string = "cart-quantity";
  totalItems = signal<number>(0);

  constructor() {}

  public getItems(): Array<CartItem> {
    const cartItems = localStorage.getItem(this.CART);

    if (cartItems) {
      return JSON.parse(cartItems);
    }

    return [];
  }

  public addItem(item: CartItem): void {
    const cartItems = this.getItems();
    const index = cartItems.findIndex(
      (cartItem) => cartItem.idProduct === item.idProduct,
    );

    if (index === -1) {
      cartItems.push(item);
    } else {
      cartItems[index].quantity += item.quantity;
    }

    localStorage.setItem(this.CART, JSON.stringify(cartItems));
    this.updateQuantity();
  }

  public removeItem(idProduct: number): void {
    const cartItems = this.getItems();
    const index = cartItems.findIndex(
      (cartItem) => cartItem.idProduct === idProduct,
    );
    if (index !== -1) {
      cartItems.splice(index, 1);
      localStorage.setItem(this.CART, JSON.stringify(cartItems));
      this.updateQuantity();
    }
  }

  public getTotalItems(): number {
    return this.getItems().length;
  }

  public getTotal(): number {
    return this.getItems().reduce(
      (acc, item) => acc + item.unitPrice * item.quantity,
      0,
    );
  }

  private updateQuantity(): void {
    const cartItems = this.getItems();
    const quantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    localStorage.setItem(this.CART_QUANTITY, quantity.toString());
    this.totalItems.set(cartItems.length);
  }
}
