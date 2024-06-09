import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

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

  constructor(private alertController: AlertController) {}

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
    if (!this.tarjetaHabiente || !this.numeroTarjeta || !this.fechaVencimiento || !this.cvv) {
      await this.presentAlert('Error', 'Por favor llenar todos los campos');
      return;
    }

    if (!this.validarNumeroTarjeta(this.numeroTarjeta)) {
      await this.presentAlert('Error', 'Número de tarjeta inválido');
      return;
    }

    if (!/^\d{3}$/.test(this.cvv)) {
      await this.presentAlert('Error', 'CVV debe ser un número de 3 dígitos');
      return;
    }

    // Aquí iría la lógica para procesar la compra y guardar la información
    // de la compra en la base de datos o en una API, etc.

    await this.presentAlert('Éxito', 'Compra realizada con éxito');
    this.limpiarCampos();
  }

  limpiarCampos() {
    this.tarjetaHabiente = '';
    this.numeroTarjeta = '';
    this.fechaVencimiento = '';
    this.cvv = '';
  }
}
