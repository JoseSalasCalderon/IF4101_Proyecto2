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
    console.log('Compra exitosa');
    this.limpiarCampos();
  }

  limpiarCampos() {
    this.tarjetaHabiente = '';
    this.numeroTarjeta = '';
    this.fechaVencimiento = '';
    this.cvv = '';
  }
}
