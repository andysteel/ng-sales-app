import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { Supplier } from "./suppliers.dto";

@Injectable({
  providedIn: "root",
})
export class SuppliersService {
  private readonly BASE_URL = `${environment.api}/suppliers`;

  constructor(private httpClient: HttpClient) {}

  public get(id: number): Observable<Supplier> {
    return this.httpClient.get<Supplier>(`${this.BASE_URL}/${id}`);
  }

  public getAll(): Observable<Supplier[]> {
    return this.httpClient.get<Supplier[]>(this.BASE_URL);
  }

  public save(supplier: Supplier): Observable<Supplier> {
    if (supplier.id) {
      return this.httpClient.put<Supplier>(
        `${this.BASE_URL}/${supplier.id}`,
        supplier,
      );
    }
    return this.httpClient.post<Supplier>(this.BASE_URL, supplier);
  }

  public delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.BASE_URL}/${id}`);
  }

  public create(): Supplier {
    return {
      id: 0,
      companyName: "",
      contactName: "",
      contactTitle: "",
      address: {
        street: "",
        city: "",
        region: "",
        postalCode: 0,
        country: "",
        phone: "",
      },
    };
  }
}
