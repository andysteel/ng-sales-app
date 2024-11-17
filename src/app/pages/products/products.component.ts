import { Component } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-products",
  standalone: true,
  imports: [MatCardModule, RouterOutlet],
  templateUrl: "./products.component.html",
  styleUrl: "./products.component.css",
})
export class ProductsComponent {}
