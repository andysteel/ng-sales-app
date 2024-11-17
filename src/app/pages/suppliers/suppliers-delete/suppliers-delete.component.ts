import { Component, OnInit, signal } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { LoadingBarComponent } from "../../../components/loading-bar/loading-bar.component";
import { SuppliersService } from "../../../services/suppliers/suppliers.service";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { Supplier } from "../../../services/suppliers/suppliers.dto";

@Component({
  selector: "app-suppliers-delete",
  standalone: true,
  imports: [MatCardModule, MatButtonModule, LoadingBarComponent, RouterModule],
  templateUrl: "./suppliers-delete.component.html",
  styleUrl: "./suppliers-delete.component.css",
})
export class SuppliersDeleteComponent implements OnInit {
  supplierSignal = signal<Supplier | undefined>(undefined);

  constructor(
    private suppliersService: SuppliersService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadSupplier();
  }

  private loadSupplier() {
    this.suppliersService.get(this.route.snapshot.params["id"]).subscribe({
      next: (value) => this.supplierSignal.set(value),
      error: (error) => console.error(error),
    });
  }

  onDelete() {
    this.suppliersService.delete(this.supplierSignal()!.id).subscribe({
      next: () => this.router.navigate(["/suppliers"]),
      error: (error) => console.error(error),
    });
  }
}
