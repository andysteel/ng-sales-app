import { Routes } from "@angular/router";
import { CategoriesComponent } from "./pages/categories/categories.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { SuppliersComponent } from "./pages/suppliers/suppliers.component";
import { SuppliersListComponent } from "./pages/suppliers/suppliers-list/suppliers-list.component";
import { SuppliersNewComponent } from "./pages/suppliers/suppliers-new/suppliers-new.component";
import { SuppliersEditComponent } from "./pages/suppliers/suppliers-edit/suppliers-edit.component";
import { SuppliersShowComponent } from "./pages/suppliers/suppliers-show/suppliers-show.component";
import { SuppliersDeleteComponent } from "./pages/suppliers/suppliers-delete/suppliers-delete.component";
import { ProductsComponent } from "./pages/products/products.component";
import { ProductsListComponent } from "./pages/products/products-list/products-list.component";
import { CheckoutComponent } from "./pages/checkout/checkout.component";

export const routes: Routes = [
  {
    path: "checkout",
    loadComponent: () =>
      import("./pages/checkout/checkout.component").then(
        (m) => m.CheckoutComponent,
      ),
  },
  {
    path: "categories",
    loadComponent: () =>
      import("./pages/categories/categories.component").then(
        (m) => m.CategoriesComponent,
      ),
  },
  {
    path: "suppliers",
    loadComponent: () =>
      import("./pages/suppliers/suppliers.component").then(
        (m) => m.SuppliersComponent,
      ),
    children: [
      { path: "", component: SuppliersListComponent },
      { path: "new", component: SuppliersNewComponent },
      { path: "edit/:id", component: SuppliersEditComponent },
      { path: "show/:id", component: SuppliersShowComponent },
      { path: "del/:id", component: SuppliersDeleteComponent },
    ],
  },
  {
    path: "",
    component: ProductsComponent,
    children: [{ path: "", component: ProductsListComponent }],
  },
];
