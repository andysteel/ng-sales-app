import { Component, effect, inject, input, output } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { Category } from "../../../../services/categories/category.request";

type CategoryForm = {
  id: FormControl<number | null>;
  name: FormControl<string | null>;
  description: FormControl<string | null>;
};

@Component({
  selector: "category-form",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: "./form.component.html",
  styles: ``,
})
export class FormComponent {
  onCancel = output<boolean>();
  onSave = output<Category>();
  private formBuilder: FormBuilder = inject(FormBuilder);
  categoryForm = this.formBuilder.group<CategoryForm>({
    id: new FormControl(null),
    name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    description: new FormControl(null, [Validators.required]),
  });
  category = input<Category>();

  constructor() {
    effect(() => {
      this.loadCategory(this.category() as Category);
    });
  }

  saveCategory(): void {
    const category = this.categoryForm.value as unknown;
    this.onSave.emit(category as Category);
  }

  onCancelFn() {
    this.onCancel.emit(false);
  }

  loadCategory(category: Category): void {
    this.categoryForm.patchValue(category);
  }
}
