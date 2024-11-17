import { Component } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-suppliers",
  standalone: true,
  imports: [MatCardModule, RouterOutlet],
  templateUrl: "./suppliers.component.html",
  styleUrl: "./suppliers.component.css",
})
export class SuppliersComponent {}
