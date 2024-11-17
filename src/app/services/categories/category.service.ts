import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Category } from "./category.request";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  private readonly BASE_URL = `${environment.api}/categories`;

  constructor(private httptClient: HttpClient) {}

  public getAll(): Observable<Category[]> {
    return this.httptClient.get<Category[]>(this.BASE_URL);
  }

  public save(category: Category): Observable<Category> {
    if (category.id) {
      return this.httptClient.put<Category>(
        `${this.BASE_URL}/${category.id}`,
        category,
      );
    }
    return this.httptClient.post<Category>(this.BASE_URL, category);
  }

  public delete(id: number): Observable<void> {
    return this.httptClient.delete<void>(`${this.BASE_URL}/${id}`);
  }
}
