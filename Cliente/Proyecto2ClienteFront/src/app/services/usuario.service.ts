import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

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

  usuarioSesionSubject: Subject<boolean> = new Subject<boolean>();
    // private usuarioSesion: Usuario | null = null;
    
  constructor(private http: HttpClient) { }

  private apiUrlUsuario = 'https://localhost:7272/api/Usuario/';

  buscarUsuario(correo: string, contrasenna: string): Observable<Usuario> {
    return this.http.get<Usuario>(this.apiUrlUsuario+'BuscarUsuario?correo='+correo+'&contrasenna='+contrasenna);
  }

  hayUsuarioEnSesion(): boolean {
    const usuarioSesion = sessionStorage.getItem('usuarioSesion');
    return usuarioSesion !== null; // Retorna true si hay un usuario en sesión, false de lo contrario
  }

  iniciarSesion() {
    this.usuarioSesionSubject.next(true); // Emite un evento indicando que se ha iniciado sesión
  }

  cerrarSesion() {
    sessionStorage.removeItem('usuarioSesion');
    this.usuarioSesionSubject.next(false); // Emite un evento indicando que se ha cerrado sesión
  }

  // asignarUsuarioSesion(usuarioEncontrado: Usuario){
  //   this.usuarioSesion = usuarioEncontrado;
  // }

  // retornarUsuarioSesion(){
  //   return this.usuarioSesion;
  // }
}
