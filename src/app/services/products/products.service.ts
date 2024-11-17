import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product } from "./product.dto";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  private readonly BASE_URL = `${environment.api}/products`;

  constructor(private httpClient: HttpClient) {}

  getAll(search = ""): Observable<Product[]> {
    const searchTerm = search !== "" ? `&q=${search}` : "";
    return this.httpClient.get<Product[]>(
      `${this.BASE_URL}?_expand=category&_expand=supplier${searchTerm}`,
    );
  }

  getById(productId: number): Observable<Product> {
    return this.httpClient.get<Product>(
      `${this.BASE_URL}/${productId}`,
    );
  }

  updateStock(productId: number, quantity: number): Observable<Product> {
    return this.httpClient.patch<Product>(`${this.BASE_URL}/${productId}`, {
      unitsInStock: quantity,
    });
  }
}
