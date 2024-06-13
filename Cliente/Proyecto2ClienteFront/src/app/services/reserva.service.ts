import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatosCupon } from './datos-cupon.service';

export interface CompraDatosCupon {
  idCompra: number;
  correo: string;
  precioTotal: number;
  descuentoFinal: number;
  tarjeta: string;
  cupones: DatosCupon[];
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
