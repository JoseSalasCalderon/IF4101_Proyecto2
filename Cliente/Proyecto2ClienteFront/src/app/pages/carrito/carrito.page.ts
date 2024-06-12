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

  precioTotal: number = 0;
  descuentoTotal: number = 0;
  precioTotalConDescuento: number = 0;

  constructor(private router: Router) { }

  ionViewWillEnter(): void {
    this.cargarCarrito();
    this.calcularTotales();
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
    this.calcularTotales();
  }

  calcularTotales(): void {
    this.precioTotal = 0;
    this.precioTotalConDescuento = 0;
    this.descuentoTotal = 0;
    
    const carritoObtenido = sessionStorage.getItem('carrito');
    const carritoCompleto = carritoObtenido? JSON.parse(carritoObtenido): null;

    for (let index = 0; index < carritoCompleto.length; index++) {
      this.precioTotal+=carritoCompleto[index].precio*carritoCompleto[index].cantidad;
      this.precioTotalConDescuento+=((carritoCompleto[index].precio*carritoCompleto[index].cantidad)-((carritoCompleto[index].precio*carritoCompleto[index].cantidad)*(carritoCompleto[index].descuento/100)));
    }

    this.precioTotal = parseFloat(this.precioTotal.toFixed(2));
    this.precioTotalConDescuento = parseFloat(this.precioTotalConDescuento.toFixed(2));
    this.descuentoTotal = ((this.precioTotal-this.precioTotalConDescuento)/this.precioTotal)*100;
    this.descuentoTotal = parseFloat(this.descuentoTotal.toFixed(2));
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
