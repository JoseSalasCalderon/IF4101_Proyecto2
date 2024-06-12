import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Compra, CompraService } from 'src/app/services/compra.service';
import { Cupon, CuponService } from 'src/app/services/cupon.service';
import { DatosCupon, DatosCuponService } from 'src/app/services/datos-cupon.service';
import { EmailJSResponseStatus, init, send } from 'emailjs-com';

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
  fechaActual: Date = new Date();
  fechaFormateada = `${String(this.fechaActual.getDate()).padStart(2, '0')}-${String(this.fechaActual.getMonth() + 1).padStart(2, '0')}-${this.fechaActual.getFullYear().toString()}
  `;

  constructor(
    private alertController: AlertController
    , private compraService: CompraService
    , private datosCuponService: DatosCuponService
    , private router: Router
  ) {
    init('5BRsUkUtWPltRgAML');
  }

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

  validarCVV(cvv: string): boolean {
    return /^\d{3}$/.test(cvv);
  }

  async comprar() {
    // Valida que el nombre del tarjetahabiente solo contenga letras
    if (!/^[a-zA-Z\s]+$/.test(this.tarjetaHabiente)) {
      this.presentAlert('Error', 'El nombre del tarjetahabiente solo debe contener letras.');
      return;
    }
  
    // Valida que la fecha de vencimiento no esté vacía
    if (this.fechaVencimiento.trim() === '') {
      this.presentAlert('Error', 'Debes ingresar la fecha de vencimiento.');
      return;
    }
  
    // Valida el CVV
    if (!this.validarCVV(this.cvv)) {
      this.presentAlert('Error', 'El CVV debe tener exactamente 3 dígitos numéricos.');
      return;
    }
  
    // Valida el número de tarjeta
    if (!this.validarNumeroTarjeta(this.numeroTarjeta)) {
      this.presentAlert('Error', 'El número de tarjeta no es válido.');
      return;
    }
  
    // Si todas las validaciones pasan, puedes proceder con la compra
    
    this.compraService.buscarIdDisponile().subscribe(responseIdDisponible => {
      if (responseIdDisponible) {
        const usuarioSesion = sessionStorage.getItem('usuarioSesion');
        const carritoSesion = sessionStorage.getItem('carrito');

        let carrito: any[] = [];
        let usuario: any = null;

        if (usuarioSesion && carritoSesion) {
          usuario = JSON.parse(usuarioSesion);
          carrito = JSON.parse(carritoSesion);
        }

        let precioTotal = 0;
        let precioTotalConDescuento = 0;
        let descuentoTotal = 0;

        for (let index = 0; index < carrito.length; index++) {
          precioTotal+=carrito[index].precio*carrito[index].cantidad;
          precioTotalConDescuento+=((carrito[index].precio*carrito[index].cantidad)-((carrito[index].precio*carrito[index].cantidad)*(carrito[index].descuento/100)));
        }

        descuentoTotal = ((precioTotal-precioTotalConDescuento)/precioTotal)*100;

        const compra: Compra = {
          idCompra: responseIdDisponible,
          cedula: usuario.cedula,
          precioTotal: precioTotal,
          descuentoFinal: descuentoTotal,
          tarjeta: this.numeroTarjeta
        };

        this.compraService.insertarCompra(compra).subscribe(response => {
          const promesas = [];
          for (let j = 0; j < carrito.length; j++) {
            const datosCupon: DatosCupon = {
              idCupon: carrito[j].idCupon,
              idCompra: responseIdDisponible,
              precio: carrito[j].precio,
              descuento: carrito[j].descuento,
              imagenRepresentativa: carrito[j].imagenRepresentativa,
              ubicacion: carrito[j].ubicacion,
              empresa: carrito[j].nombreEmpresa,
              categoria: carrito[j].nombreCategoria,
              cantidad: carrito[j].cantidad
            };

            promesas.push(new Promise<boolean>((resolve) => {
              this.datosCuponService.insertarDatosCupon(datosCupon).subscribe(response => {
                resolve(!!response);
              });
            }));
          }// for

          Promise.all(promesas).then(results => {
            const funciono = results.some(result => result);
            if (funciono) {
              sessionStorage.removeItem('carrito');
              this.presentAlert('Registro', 'Reserva Exitosa!');
              // Se llama al enviar correo
              this.darFormatoYEnviarEmail(compra, carrito, usuario);
              this.limpiarCampos();
              this.router.navigate(['/home']);
            }
          }).catch(error => {
            console.error('Error en una de las peticiones', error);
            this.presentAlert('Error', 'Error en una de las peticiones');
          });
        });

        
      }// if
    });
  }// compra

  darFormatoYEnviarEmail(compra: any, cupones: any[], usuario: any){
    let cuponesString = ``;

    for (let index = 0; index < cupones.length; index++) {
        cuponesString += `
            <div style="border: 1px solid #d0d0d0; padding: 10px; margin-bottom: 10px;">
                <img src="${cupones[index].imagenRepresentativa}" alt="Imagen Representativa" style="width: 100px; height: auto; display: block; margin-bottom: 10px;">
                <p><strong>Empresa:</strong> ${cupones[index].nombreEmpresa}</p>
                <p><strong>Ubicación:</strong> ${cupones[index].ubicacion}</p>
                <p><strong>Cantidad:</strong> ${cupones[index].cantidad}</p>
                <p><strong>Precio:</strong> ₡${cupones[index].precio.toFixed(2)}</p>
                <p><strong>Descuento:</strong> ${cupones[index].descuento}%</p>
            </div>
        `;
    };

    // Se crea el formato del email
    const parametrosEmail = {
      destinatario: usuario.correo,
      remitente: 'Facil Cupones',
      titulo: 'Comprobante Facil Cupones',
      nombre: usuario.nombre,
      apellidos: usuario.apellidos,
      idCompra: compra.idCompra,
      precioTotal: compra.precioTotal.toFixed(2),
      descuentoTotal: compra.descuentoFinal.toFixed(2),
      tarjeta: this.numeroTarjeta.slice(0, -4).replace(/\d/g, '*') + this.numeroTarjeta.slice(-4),
      fechaActual: this.fechaFormateada,
      cupones: cuponesString
    };

    // Enviamos el email
    this.enviarEmail(parametrosEmail);
    
  }

  enviarEmail(templateParams: any) {
    return send('service_5qnmhtj', 'template_m67lxmr', templateParams)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
      }, (err) => {
        console.error('FAILED...', err);
      });
  }

  limpiarCampos() {
    this.tarjetaHabiente = '';
    this.numeroTarjeta = '';
    this.fechaVencimiento = '';
    this.cvv = '';
  }
}
