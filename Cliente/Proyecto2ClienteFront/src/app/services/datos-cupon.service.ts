import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DatosCupon {
  idCupon: number;
  idCompra: number;
  precio: number;
  descuento: number;
  imagenRepresentativa: string;
  ubicacion: string;
  empresa: string;
  categoria: string;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class DatosCuponService {

  constructor(private http: HttpClient) { }

  private apiUrlDatosCupon = 'https://localhost:7272/api/DatosCupon/CrearDatosCupon';

  insertarDatosCupon(datosCupon: DatosCupon): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrlDatosCupon, datosCupon);
  }
}
