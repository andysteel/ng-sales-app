import { CurrencyPipe } from "@angular/common";
import { Component, inject, OnInit, signal } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { CartService } from "../../services/cart/cart.service";
import { CartItem } from "../../services/cart/cart-item.dto";
import { MatButtonModule } from "@angular/material/button";
import { ProductsService } from "../../services/products/products.service";

@Component({
  selector: "app-checkout",
  standalone: true,
  imports: [MatCardModule, MatIconModule, CurrencyPipe, MatButtonModule],
  templateUrl: "./checkout.component.html",
  styleUrl: "./checkout.component.css",
})
export class CheckoutComponent implements OnInit {
  cartService = inject(CartService);
  productService = inject(ProductsService);
  items = signal<CartItem[]>([]);

  ngOnInit(): void {
    this.items.set(this.cartService.getItems());
  }

  onRemoveItem(idProduct: number): void {

    const productToRemove = this.items().filter((item) => item.idProduct === idProduct).shift();
    if (!productToRemove) {
      return;
    }

    this.productService.getById(idProduct).subscribe({
      next: (product) => this.productService.updateStock(product.id!, product.unitsInStock + productToRemove.quantity).subscribe({
        next: _ => {
          this.cartService.removeItem(idProduct);
          this.items.set(this.cartService.getItems());
        },
        error: (error) => console.error(error),
      }),
      error: (error) => console.error(error),
    })

  }
}
