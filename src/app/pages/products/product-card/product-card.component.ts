import { Component, inject, input, output } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { Product } from "../../../services/products/product.dto";
import { CurrencyPipe } from "@angular/common";
import { CartItem } from "../../../services/cart/cart-item.dto";
import { CartService } from "../../../services/cart/cart.service";

@Component({
  selector: "app-product-card",
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, CurrencyPipe],
  templateUrl: "./product-card.component.html",
  styleUrl: "./product-card.component.css",
})
export class ProductCardComponent {
  cartService = inject(CartService);
  product = input.required<Product>();

  onAddToCart = output<Product>();

  addToCart(product: Product) {
    this.onAddToCart.emit(product);
  }
}
