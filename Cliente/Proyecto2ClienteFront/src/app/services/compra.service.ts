import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Compra {
  idCompra: number;
  cedula: string;
  precioTotal: number;
  descuentoFinal: number;
  tarjeta: string;
}

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  constructor(private http: HttpClient) { }

  private apiUrlCompra = 'https://localhost:7272/api/Compra/';

  insertarCompra(compra: Compra): Observable<{ idCompra: number }> {
    return this.http.post<{ idCompra: number }>(this.apiUrlCompra+"CrearCompra", compra);
  }

  buscarIdDisponile(): Observable<number> {
    return this.http.get<number>(this.apiUrlCompra+'buscarIdDisponible');
  }
}
