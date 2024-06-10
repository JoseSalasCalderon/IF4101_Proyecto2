import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CuponService, Compra, DatosCupon } from 'src/app/services/cupon.service';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.page.html',
  styleUrls: ['./compra.page.scss'],
})
export class CompraPage implements OnInit {

  tarjetaHabiente: string = '';
  numeroTarjeta: string = '';
  fechaVencimiento: string = '';
  cvv: string = '';

  constructor(private alertController: AlertController, private cuponService: CuponService) {}

  ngOnInit() {
    ""
  }

  validarNumeroTarjeta(numeroTarjeta: string): boolean {
    let suma = 0;
    let longitud = numeroTarjeta.length;
    let esPar = false;

    for (let i = longitud - 1; i >= 0; i--) {
      let digito = parseInt(numeroTarjeta.charAt(i));
      
      if (esPar) {
        digito *= 2;

        if (digito > 9) {
          digito -= 9;
        }
      }

      suma += digito;
      esPar = !esPar;
    }

    return suma % 10 === 0;
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  async comprar() {
    // Obtener datos del carrito desde sessionStorage
    let carrito = JSON.parse(sessionStorage.getItem('carrito') || '[]');

    // Obtener precio total y descuento final del carrito
    let precioTotal = 0;
    let descuentoFinal = 0;
    for (let item of carrito) {
      precioTotal += item.precio * item.cantidad;
      descuentoFinal += item.descuento * item.cantidad;
    }

    // Crear objeto de Compra
    let compra: Compra = {
      idCompra: 0,
      cedula: '', // Aquí deberías obtener la cédula del usuario desde alguna fuente
      precioTotal: precioTotal,
      descuentoFinal: descuentoFinal,
      tarjeta: this.numeroTarjeta // Supongo que aquí quieres guardar el número de tarjeta, ajusta según tus necesidades
    };

    // Insertar la compra en la base de datos
    this.cuponService.crearCompra(compra).subscribe((response) => {
      // Obtener el id de la compra creada
      const idCompra = response.idCompra;

      // Crear y insertar los datos de cupón asociados
      for (let item of carrito) {
        let datosCupon: DatosCupon = {
          idCupon: item.idCupon,
          idCompra: idCompra,
          precio: item.precio,
          descuento: item.descuento,
          imagenRepresentativa: item.imagenRepresentativa,
          ubicacion: item.ubicacion,
          empresa: item.empresa,
          categoria: item.categoria,
          cantidad: item.cantidad
        };

        // Insertar los datos del cupón en la base de datos
        this.cuponService.crearDatosCupon(datosCupon).subscribe(() => {
          // Éxito al insertar datos del cupón
        }, (error) => {
          // Manejar errores al insertar datos del cupón
          console.error('Error al insertar datos del cupón:', error);
        });
      }

      // Limpiar el carrito en sessionStorage después de la compra
      sessionStorage.removeItem('carrito');

      // Mostrar alerta de compra exitosa
      this.presentAlert('Compra exitosa', 'Su compra ha sido procesada correctamente.');

      // Limpiar los campos del formulario después de la compra
      this.limpiarCampos();
    }, (error) => {
      // Manejar errores al insertar la compra
      console.error('Error al realizar la compra:', error);
      this.presentAlert('Error', 'Ocurrió un error al procesar su compra. Por favor, inténtelo de nuevo más tarde.');
    });
  }

  limpiarCampos() {
    this.tarjetaHabiente = '';
    this.numeroTarjeta = '';
    this.fechaVencimiento = '';
    this.cvv = '';
  }
}
