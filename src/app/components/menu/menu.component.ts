import { Component } from "@angular/core";
import { MatListModule } from "@angular/material/list";

type MenuItem = {
  title: string;
  icon: string;
  link: string;
};

@Component({
  selector: "app-menu",
  standalone: true,
  imports: [MatListModule],
  template: `
    @for (item of menuItems; track item.link) {
      <a mat-list-item [href]="item.link">{{ item.title }}</a>
    }
  `,
  styles: "",
})
export class MenuComponent {
  menuItems: Array<MenuItem> = [
    { title: "Home", icon: "dashboard", link: "/" },
    { title: "Categories", icon: "", link: "/categories" },
    { title: "Suppliers", icon: "", link: "/suppliers" },
  ];
}
