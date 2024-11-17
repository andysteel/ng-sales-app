import { Component, inject } from "@angular/core";
import { SuppliersService } from "../../../services/suppliers/suppliers.service";
import { Router } from "@angular/router";
import { Supplier } from "../../../services/suppliers/suppliers.dto";
import { MatCardModule } from "@angular/material/card";
import { LoadingBarComponent } from "../../../components/loading-bar/loading-bar.component";
import { SuppliersFormComponent } from "../suppliers-form/suppliers-form.component";

@Component({
  selector: "app-suppliers-new",
  standalone: true,
  imports: [MatCardModule, LoadingBarComponent, SuppliersFormComponent],
  templateUrl: "./suppliers-new.component.html",
  styleUrl: "./suppliers-new.component.css",
})
export class SuppliersNewComponent {
  suppliersService = inject(SuppliersService);
  router = inject(Router);
  supplier: Supplier = this.suppliersService.create();
  loading = false;

  onSave(supplier: Supplier) {
    this.loading = true;
    this.suppliersService.save(supplier).subscribe({
      next: (response) =>
        this.router.navigate(["/suppliers/show/", response.id]),
      error: (error) => console.error(error),
      complete: () => (this.loading = false),
    });
  }

  onBack() {
    this.router.navigate(["/suppliers"]);
  }
}
