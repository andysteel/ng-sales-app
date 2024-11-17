import { Component, inject, input, OnInit, output } from "@angular/core";
import { Supplier } from "../../../services/suppliers/suppliers.dto";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

type AdressForm = {
  street: FormControl<string | null>;
  city: FormControl<string | null>;
  region: FormControl<string | null>;
  postalCode: FormControl<number | null>;
  country: FormControl<string | null>;
  phone: FormControl<string | null>;
};

type SupplierForm = {
  id: FormControl<number | null>;
  companyName: FormControl<string | null>;
  contactName: FormControl<string | null>;
  contactTitle: FormControl<string | null>;
  address: FormGroup<AdressForm>;
};

@Component({
  selector: "app-suppliers-form",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: "./suppliers-form.component.html",
  styleUrl: "./suppliers-form.component.css",
})
export class SuppliersFormComponent implements OnInit {
  supplier = input.required<Supplier>();
  save = output<Supplier>();
  back = output<void>();
  supplierForm!: FormGroup<SupplierForm>;

  private formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.supplierForm = this.formBuilder.group<SupplierForm>({
      id: new FormControl(this.supplier()?.id),
      companyName: new FormControl(this.supplier()?.companyName, [
        Validators.required,
        Validators.minLength(3),
      ]),
      contactName: new FormControl(this.supplier()?.contactName, [
        Validators.required,
        Validators.minLength(3),
      ]),
      contactTitle: new FormControl(this.supplier()?.contactTitle, [
        Validators.required,
      ]),
      address: this.formBuilder.group<AdressForm>({
        street: new FormControl(this.supplier()?.address.street),
        city: new FormControl(this.supplier()?.address.city),
        region: new FormControl(this.supplier()?.address.region),
        postalCode: new FormControl(this.supplier()?.address.postalCode),
        country: new FormControl(this.supplier()?.address.country),
        phone: new FormControl(this.supplier()?.address.phone),
      }),
    });
  }

  onSubmit(): void {
    this.save.emit(this.supplierForm.value as Supplier);
  }

  onBack(event: any): void {
    event.preventDefault();
    this.back.emit();
  }
}
