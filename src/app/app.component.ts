import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { HomeComponent } from "./pages/home/home.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, HomeComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = "my-sales-app";
}
