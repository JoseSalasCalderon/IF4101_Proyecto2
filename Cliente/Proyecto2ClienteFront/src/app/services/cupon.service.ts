import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cupon {
  idCupon: number;
  idCategoria: number;
  nombreCategoria: string;
  nombreUsuario: string;
  nombreEmpresa: string;
  codigo: string;
  nombre: string;
  precio: number;
  descuento: number;
  ubicacion: string | null;
  imagenRepresentativa: string | null;
  fechaCreacion: Date;
  fechaInicio: Date;
  fechaFinalizacion: Date;
  activo: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CuponService {

  constructor(private http: HttpClient) { }

  private apiUrlCupon = 'https://localhost:7272/api/Cupon';

  obtenerCupones(): Observable<Cupon[]> {
    return this.http.get<Cupon[]>(this.apiUrlCupon);
  }
}
