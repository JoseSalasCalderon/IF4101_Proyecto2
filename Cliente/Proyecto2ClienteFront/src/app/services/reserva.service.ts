import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CompraDatosCupon {
  idCompra: number;
  cedula: string;
  precioTotal: number;
  descuentoFinal: number;
  imagenRepresentativa: string;
  ubicacion: string;
  empresa: string;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  constructor(private http: HttpClient) { }

  private apiUrlCompra = 'https://localhost:7272/api/Compra/ObtenerCompraConDatosCupon';

  obtenerCompraConDatosCupon(cedula: string): Observable<CompraDatosCupon[]> {
    return this.http.get<CompraDatosCupon[]>(`${this.apiUrlCompra}/${cedula}`);
  }
}
