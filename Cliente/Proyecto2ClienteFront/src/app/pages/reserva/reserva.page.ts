import { Component, OnInit } from '@angular/core';
import { ReservaService, CompraDatosCupon } from 'src/app/services/reserva.service';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.page.html',
  styleUrls: ['./reserva.page.scss'],
})
export class ReservaPage implements OnInit {
  comprasConDatosCupon: CompraDatosCupon[] = [];
  mensajeNoReservas: string = '';

  constructor(private reservaService: ReservaService) { }

  ngOnInit(): void {
    // Obtener el usuario en sesión del sessionStorage
    const usuarioSesionString = sessionStorage.getItem('usuarioSesion');
    
    if (usuarioSesionString) {
      // Si la cadena del usuario en sesión está presente, convertirla a objeto JSON
      const usuarioSesion = JSON.parse(usuarioSesionString);
      
      // Verificar que el objeto tenga una cédula válida
      if (usuarioSesion && usuarioSesion.cedula) {
        // Si la cédula está presente en el usuario en sesión, llamar al servicio para obtener las compras con datos de cupón
        this.reservaService.obtenerCompraConDatosCupon(usuarioSesion.cedula)
          .subscribe((compras) => {
            if (compras.length === 0) {
              // No hay reservas, establecer el mensaje personalizado
              this.mensajeNoReservas = 'No existen reservas asociadas a este usuario.';
            } else {
              this.comprasConDatosCupon = compras;
            }
          }, (error) => {
            console.error('Error al obtener las reservas:');
          });
      } else {
        console.error('No se encontró la cédula del usuario en sesión.');
      }
    } else {
      console.error('No se encontró ningún usuario en sesión.');
    }
  }
}