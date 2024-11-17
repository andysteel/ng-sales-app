import { AfterViewInit, Component, signal, ViewChild } from "@angular/core";
import {
  MatTableModule,
  MatTable,
  MatTableDataSource,
} from "@angular/material/table";
import { MatPaginatorModule, MatPaginator } from "@angular/material/paginator";
import { MatSortModule, MatSort } from "@angular/material/sort";
import { CategoriesItem } from "./categories-datasource";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { Category } from "../../services/categories/category.request";
import { CategoryService } from "../../services/categories/category.service";
import { FormComponent } from "./components/form/form.component";
import { MatIconModule } from "@angular/material/icon";
import { LoadingBarComponent } from "../../components/loading-bar/loading-bar.component";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styles: `
    .full-width-table {
      width: 100%;
    }
  `,
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatButtonModule,
    FormComponent,
    MatIconModule,
    LoadingBarComponent,
  ],
})
export class CategoriesComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<CategoriesItem>;
  dataSource = new MatTableDataSource<Category>([]);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ["id", "name", "description", "actions"];
  showForm = signal(false);
  category = signal<Category | undefined>(undefined);
  showLoading = signal(false);

  constructor(private categoryService: CategoryService) {}

  ngAfterViewInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.showLoading.set(true);
    this.categoryService.getAll().subscribe((categories) => {
      this.dataSource.data = categories;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
      this.showLoading.set(false);
    });
  }

  onNewCategory(): void {
    this.category.set(undefined);
    this.showForm.set(true);
  }

  cancelForm(event: boolean): void {
    this.showForm.set(event);
    this.loadCategories();
  }

  saveCategory(category: Category): void {
    this.showLoading.set(true);
    this.categoryService.save(category).subscribe({
      next: (_) => this.cancelForm(false),
      error: (error) => {
        console.error(error);
        this.showLoading.set(false);
      },
    });
  }

  onEditCategory(row: Category) {
    this.category.set(row);
    this.showForm.set(true);
  }

  onDeleteCategory(row: Category) {
    if (confirm("Are you sure you want to delete this category?")) {
      this.showLoading.set(true);
      this.categoryService.delete(row.id).subscribe({
        next: (_) => this.loadCategories(),
        error: (error) => {
          console.error(error);
          this.showLoading.set(false);
        },
      });
    }
  }
}
