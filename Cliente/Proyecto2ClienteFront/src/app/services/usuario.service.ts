import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Usuario {
  idUsuario: number;
  cedula: string;
  nombre: string;
  apellidos: string;
  fechaNacimiento: string;
  correo: string;
  contrasenna: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  private apiUrlUsuario = 'https://localhost:7272/api/Usuario/';

  buscarUsuario(correo: string, contrasenna: string): Observable<Usuario> {
    return this.http.get<Usuario>(this.apiUrlUsuario+'BuscarUsuario?correo='+correo+'&contrasenna='+contrasenna);
  }
}
