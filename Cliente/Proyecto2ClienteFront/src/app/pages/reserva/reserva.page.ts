import { Component, OnInit } from '@angular/core';
import { ReservaService, CompraDatosCupon } from 'src/app/services/reserva.service';

interface CompraAgrupada {
  idCompra: number;
  cedula: string;
  precioTotal: number;
  descuentoFinal: number;
  cupones: CompraDatosCupon[];
}

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.page.html',
  styleUrls: ['./reserva.page.scss'],
})
export class ReservaPage implements OnInit {
  comprasAgrupadas: CompraAgrupada[] = [];
  mensajeNoReservas: string = '';

  constructor(private reservaService: ReservaService) { }

  ngOnInit(): void {
    const usuarioSesionString = sessionStorage.getItem('usuarioSesion');
    
    if (usuarioSesionString) {
      const usuarioSesion = JSON.parse(usuarioSesionString);
      
      if (usuarioSesion && usuarioSesion.cedula) {
        this.reservaService.obtenerCompraConDatosCupon(usuarioSesion.cedula)
          .subscribe((compras) => {
            if (compras.length === 0) {
              this.mensajeNoReservas = 'No existen reservas asociadas a este usuario.';
            } else {
              this.comprasAgrupadas = this.agruparComprasPorId(compras);
            }
          }, (error) => {
            console.error('Error al obtener las reservas:', error);
          });
      } else {
        console.error('No se encontró la cédula del usuario en sesión.');
      }
    } else {
      console.error('No se encontró ningún usuario en sesión.');
    }
  }

  agruparComprasPorId(compras: CompraDatosCupon[]): CompraAgrupada[] {
    const agrupadas: { [key: number]: CompraAgrupada } = {};

    compras.forEach((compra) => {
      if (!agrupadas[compra.idCompra]) {
        agrupadas[compra.idCompra] = {
          idCompra: compra.idCompra,
          cedula: compra.cedula,
          precioTotal: compra.precioTotal,
          descuentoFinal: compra.descuentoFinal,
          cupones: []
        };
      }
      agrupadas[compra.idCompra].cupones.push(compra);
    });

    return Object.values(agrupadas);
  }
}
