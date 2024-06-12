import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrarseService } from 'src/app/services/registrarse.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
})
export class RegistrarsePage {
  usuario: any;

  constructor(
    private router: Router,
    private registrarseService: RegistrarseService,
    private usuarioService: UsuarioService,
    private alertController: AlertController
  ) {
    this.usuario = {
      idUsuario: 0,
      cedula: '',
      nombre: '',
      apellidos: '',
      fechaNacimiento: '',
      correo: '',
      contrasenna: ''
    };
  }

  confirmar() {
    const { nombre, cedula, apellidos, fechaNacimiento, correo, contrasenna } = this.usuario;

    if (!nombre || !cedula || !apellidos || !fechaNacimiento || !correo || !contrasenna) {
      this.presentAlert('Error', 'Por favor llenar todos los campos');
      return;
    }

    if (nombre.length > 11) {
      this.presentAlert('Error', 'El nombre debe tener menos de 12 caracteres');
      return;
    }

    const nombreValido = /^[a-zA-Z\s]+$/.test(nombre);
    if (!nombreValido) {
      this.presentAlert('Error', 'El nombre solo debe contener letras y espacios');
      return;
    }

    if (apellidos.length >= 30) {
      this.presentAlert('Error', 'El apellido debe tener menos de 30 caracteres');
      return;
    }

    const apellidoValido = /^[a-zA-Z\s]+$/.test(apellidos);
    if (!apellidoValido) {
      this.presentAlert('Error', 'El apellido solo debe contener letras y espacios');
      return;
    }

    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
    if (!correoValido) {
      this.presentAlert('Error', 'Por favor ingrese un correo válido');
      return;
    }

    const cedulaValida = /^\d{2}-\d{4}-\d{4}$/.test(cedula);
    if (!cedulaValida) {
      this.presentAlert('Error', 'La cédula debe tener el formato 00-0000-0000');
      return;
    }

    const contrasennaValida = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(contrasenna);
    if (!contrasennaValida) {
      this.presentAlert('Error', 'La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una letra minúscula, un número y un carácter especial');
      return;
    }

    this.usuarioService.buscarUsuario(correo,contrasenna).subscribe(
      usuarioExistente => {
        if (usuarioExistente) {
          this.presentAlert('Error', 'El correo ya está registrado');
        } else {
          this.registrarUsuario();
        }
      },
      error => {
        console.error('Error en el servicio', error);
        this.presentAlert('Error', 'Error en el servicio');
      }
    );
  }

  registrarUsuario() {
    this.registrarseService.registrarUsuario(this.usuario).subscribe(
      response => {
        if (response) {
          console.log('Usuario registrado exitosamente');
          this.presentAlert('Registro', 'Usuario registrado exitosamente');
          this.limpiarCampos();
        } else {
          console.log('Error al registrar usuario');
          this.presentAlert('Error', 'Error al registrar usuario');
        }
      },
      error => {
        console.error('Error en el servicio', error);
        this.presentAlert('Error', 'Error en el servicio');
      }
    );
  }

  limpiarCampos() {
    this.usuario = {
      idUsuario: 0,
      cedula: '',
      nombre: '',
      apellidos: '',
      fechaNacimiento: '',
      correo: '',
      contrasenna: ''
    };
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  atras() {
    console.log('Iniciar Sesión');
    this.router.navigate(['/usuario']);
  }
}
