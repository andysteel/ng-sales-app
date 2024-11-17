import { Component, OnInit, signal } from "@angular/core";
import { Product } from "../../../services/products/product.dto";
import { ProductsService } from "../../../services/products/products.service";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { LoadingBarComponent } from "../../../components/loading-bar/loading-bar.component";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { CartService } from "../../../services/cart/cart.service";
import { CartItem } from "../../../services/cart/cart-item.dto";
import { ProductCardComponent } from "../product-card/product-card.component";

@Component({
  selector: "app-products-list",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    LoadingBarComponent,
    ProductCardComponent,
  ],
  templateUrl: "./products-list.component.html",
  styleUrl: "./products-list.component.css",
})
export class ProductsListComponent implements OnInit {
  productsSignal = signal<Product[] | undefined>(undefined);
  searchForm!: FormGroup;
  loading = signal<boolean>(false);

  constructor(
    private productService: ProductsService,
    private formBuilder: FormBuilder,
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getProducts();
  }

  initForm() {
    this.searchForm = this.formBuilder.group({
      search: [""],
    });
  }

  getProducts(search?: string) {
    this.loading.set(true);
    this.productService.getAll(search).subscribe({
      next: (products) => this.productsSignal.set(products),
      error: (error) => console.error(error),
      complete: () => this.loading.set(false),
    });
  }

  onSearch() {
    this.getProducts(this.searchForm.value.search);
  }

  addToCart(product: Product) {
    const cartItem: CartItem = {
      idProduct: product.id,
      name: product.name,
      quantity: 1,
      unitPrice: product.unitPrice,
    };
    this.cartService.addItem(cartItem);
    
    this.productService.updateStock(product.id!, product.unitsInStock - 1)
    .subscribe({
      next: _ => this.getProducts(),
      error: (error) => console.error(error),
    })
  }

}
