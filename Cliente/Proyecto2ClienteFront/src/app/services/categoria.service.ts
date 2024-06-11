import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Categoria {
  idCategoria: number;
  nombreCategoria: string;
}
@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private categoriasUrl = 'https://localhost:7272/api/Categoria';

  constructor(private http: HttpClient) { }

  obtenerCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.categoriasUrl);
  }
}
