import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cupon {
  idCupon: number;
  idCategoria: number;
  nombreUsuario: string;
  codigo: string;
  nombre: string;
  precio: number;
  descuento: number | null;
  ubicacion: string | null;
  imagenRepresentativa: string | null;
  fechaCreacion: Date;
  fechaInicio: Date;
  fechaFinalizacion: Date;
  activo: boolean;
}

export interface Compra {
  idCompra: number;
  cedula: string;
  precioTotal: number;
  descuentoFinal: number;
  tarjeta: string;
}

export interface DatosCupon {
  idCupon: number;
  idCompra: number;
  precio: number;
  descuento: number | null;
  imagenRepresentativa: string | null;
  ubicacion: string | null;
  empresa: string;
  categoria: string;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class CuponService {

  constructor(private http: HttpClient) { }

  private apiUrlCupon = 'https://localhost:7272/api/Cupon';
  private apiUrlCompra = 'https://localhost:7272/api/Compra/CrearCompra';
  private apiUrlDatosCupon = 'https://localhost:7272/api/DatosCupon/CrearDatosCupon';

  obtenerCupones(): Observable<Cupon[]> {
    return this.http.get<Cupon[]>(this.apiUrlCupon);
  }

  crearCompra(compra: Compra): Observable<{ idCompra: number }> {
    return this.http.post<{ idCompra: number }>(this.apiUrlCompra, compra);
  }

  crearDatosCupon(datosCupon: DatosCupon): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrlDatosCupon, datosCupon);
  }
}
