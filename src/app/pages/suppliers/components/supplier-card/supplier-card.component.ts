import { Component, input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { Supplier } from "../../../../services/suppliers/suppliers.dto";

@Component({
  selector: "app-supplier-card",
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterLink, MatIconModule],
  templateUrl: "./supplier-card.component.html",
  styleUrl: "./supplier-card.component.css",
})
export class SupplierCardComponent {
  supplier = input.required<Supplier>();
}
