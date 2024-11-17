import { Component, inject } from "@angular/core";
import { SuppliersService } from "../../../services/suppliers/suppliers.service";
import { toSignal } from "@angular/core/rxjs-interop";
import { MatCardModule } from "@angular/material/card";
import { LoadingBarComponent } from "../../../components/loading-bar/loading-bar.component";
import { MatButtonModule } from "@angular/material/button";
import { RouterLink } from "@angular/router";
import { SupplierCardComponent } from "../components/supplier-card/supplier-card.component";

@Component({
  selector: "app-suppliers-list",
  standalone: true,
  imports: [
    MatCardModule,
    LoadingBarComponent,
    RouterLink,
    SupplierCardComponent,
    MatButtonModule,
  ],
  templateUrl: "./suppliers-list.component.html",
  styleUrl: "./suppliers-list.component.css",
})
export class SuppliersListComponent {
  suppliersService = inject(SuppliersService);
  supplierSignal = toSignal(this.suppliersService.getAll());
}
