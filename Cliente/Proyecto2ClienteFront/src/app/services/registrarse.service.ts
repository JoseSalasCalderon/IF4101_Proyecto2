import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  idUsuario: number;
  cedula: string;
  nombre: string;
  apellidos: string;
  fechaNacimiento: Date;
  correo: string;
  contrasenna: string;
}
@Injectable({
  providedIn: 'root'
})
export class RegistrarseService {

  constructor(private http: HttpClient) { }

  private apiUrlRegistrarse = 'https://localhost:7272/api/Usuario/RegistrarUsuario';

  registrarUsuario(usuario: Usuario): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrlRegistrarse}`, usuario);
  }
}
