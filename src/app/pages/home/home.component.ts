import { Component, inject, OnInit } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { AsyncPipe } from "@angular/common";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { MenuComponent } from "../../components/menu/menu.component";
import { RouterOutlet } from "@angular/router";
import { CartService } from "../../services/cart/cart.service";
import { CartBadgeComponent } from "../../components/cart-badge/cart-badge.component";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    MenuComponent,
    RouterOutlet,
    CartBadgeComponent
  ],
})
export class HomeComponent implements OnInit {

  private breakpointObserver = inject(BreakpointObserver);
  cartService = inject(CartService);

  ngOnInit(): void {
    this.cartService.totalItems.set(this.cartService.getItems().length);
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay(),
    );
}
