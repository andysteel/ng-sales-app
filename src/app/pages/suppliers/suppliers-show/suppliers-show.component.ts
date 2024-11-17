import { Component, inject, OnInit, signal } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { SuppliersService } from "../../../services/suppliers/suppliers.service";
import { Supplier } from "../../../services/suppliers/suppliers.dto";
import { JsonPipe } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { LoadingBarComponent } from "../../../components/loading-bar/loading-bar.component";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-suppliers-show",
  standalone: true,
  imports: [MatCardModule, RouterLink, LoadingBarComponent, MatButtonModule],
  templateUrl: "./suppliers-show.component.html",
  styleUrl: "./suppliers-show.component.css",
})
export class SuppliersShowComponent implements OnInit {
  route = inject(ActivatedRoute);
  supplierService = inject(SuppliersService);
  supplier = signal<Supplier | undefined>(undefined);

  ngOnInit(): void {
    this.supplierService
      .get(this.route.snapshot.params["id"])
      .subscribe((supplier) => this.supplier.set(supplier));
  }
}
