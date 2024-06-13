import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  usuarioEnSesion: boolean = false;
  constructor(private usuarioService: UsuarioService, private router: Router,) {}

  ngOnInit(): void {
    this.usuarioEnSesion = this.usuarioService.hayUsuarioEnSesion();
    this.usuarioService.usuarioSesionSubject.subscribe((sesionIniciada: boolean) => {
      this.usuarioEnSesion = sesionIniciada;
    });
  }

  cerrarSesion(): void {
    this.usuarioService.cerrarSesion();
    this.router.navigate(['/home']);
  }

  redirigirACupon() {
    this.router.navigate(['/carrito']);
  }
}
