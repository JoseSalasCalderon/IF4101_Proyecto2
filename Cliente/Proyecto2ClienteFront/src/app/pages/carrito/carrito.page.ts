import { Component, OnInit } from '@angular/core';
import { Cupon } from 'src/app/services/cupon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage  {

  carrito: (Cupon & { cantidad: number })[] = [];

  constructor(private router: Router) { }

  ionViewWillEnter(): void {
    this.cargarCarrito();
  }

  cargarCarrito(): void {
    const carritoData = sessionStorage.getItem('carrito');
    if (carritoData) {
      this.carrito = JSON.parse(carritoData);
    }
  }

  aumentarCantidad(cupon: (Cupon & { cantidad: number })): void {
    cupon.cantidad += 1;
    this.actualizarCarrito();
  }

  disminuirCantidad(cupon: (Cupon & { cantidad: number })): void {
    if (cupon.cantidad > 1) {
      cupon.cantidad -= 1;
    } else {
      this.eliminarCupon(cupon);
    }
    this.actualizarCarrito();
  }

  eliminarCupon(cupon: (Cupon & { cantidad: number })): void {
    this.carrito = this.carrito.filter(item => item.idCupon !== cupon.idCupon);
    this.actualizarCarrito();
  }

  actualizarCarrito(): void {
    sessionStorage.setItem('carrito', JSON.stringify(this.carrito));
  }

  pasarACompra(): void {
    const usuarioSesion = sessionStorage.getItem('usuarioSesion');
    if (usuarioSesion) {
      this.router.navigate(['/compra']);
    } else {
      this.router.navigate(['/usuario']);
    }
  }

}
