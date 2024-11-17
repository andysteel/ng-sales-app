import { Component, inject, OnInit, signal } from "@angular/core";
import { SuppliersFormComponent } from "../suppliers-form/suppliers-form.component";
import { MatCardModule } from "@angular/material/card";
import { ActivatedRoute, Router } from "@angular/router";
import { SuppliersService } from "../../../services/suppliers/suppliers.service";
import { Supplier } from "../../../services/suppliers/suppliers.dto";
import { LoadingBarComponent } from "../../../components/loading-bar/loading-bar.component";

@Component({
  selector: "app-suppliers-edit",
  standalone: true,
  imports: [MatCardModule, SuppliersFormComponent, LoadingBarComponent],
  templateUrl: "./suppliers-edit.component.html",
  styleUrl: "./suppliers-edit.component.css",
})
export class SuppliersEditComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private suppliersService = inject(SuppliersService);
  supplierSignal = signal<Supplier | undefined>(undefined);

  constructor() {}

  ngOnInit(): void {
    this.loadSupplier();
  }

  onSave(supplier: Supplier) {
    this.suppliersService.save(supplier).subscribe({
      next: () => this.router.navigate(["/suppliers/show/", supplier.id]),
      error: (error) => console.error(error),
    });
  }

  onBack() {
    this.router.navigate(["/suppliers"]);
  }

  private loadSupplier() {
    this.suppliersService.get(this.route.snapshot.params["id"]).subscribe({
      next: (value) => this.supplierSignal.set(value),
      error: (error) => console.error(error),
    });
  }
}
