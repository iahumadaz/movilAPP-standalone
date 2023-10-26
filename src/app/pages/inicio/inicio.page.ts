import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, AnimationController, IonicModule, ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { NivelEducacional } from 'src/app/model/nivel-educacional';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class InicioPage implements OnInit, AfterViewInit {

  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;
  @ViewChild('itemNombre', { read: ElementRef }) itemNombre!: ElementRef;
  @ViewChild('itemApellido', { read: ElementRef }) itemApellido!: ElementRef;
  @ViewChild('itemEducacion', { read: ElementRef }) itemEducacion!: ElementRef;
  @ViewChild('itemFechaNacimiento', { read: ElementRef }) itemFechaNacimiento!: ElementRef;

  public usuario: Usuario;
  public idNivelEducacional: number;

  public nivelesEducacionales: NivelEducacional[] = NivelEducacional.getNivelesEducacionales();

  constructor(
    private activeroute: ActivatedRoute // Permite obtener los parámetros de la página login
  , private router: Router // Permite navegar entre páginas
  , private alertController: AlertController // Permite mostrar mensajes emergentes más complejos que Toast
  , private animationController: AnimationController
  , private toastController: ToastController)  { 

    this.usuario = new Usuario('', '', '', '', '', '', 0, null);
    this.idNivelEducacional = 0;

    // Se llama a la ruta activa y se obtienen sus parámetros mediante una subscripcion
    this.activeroute.queryParams.subscribe(params => { 

      const nav = this.router.getCurrentNavigation();
      if (nav) {
        // Si tiene datos extra, se rescatan y se asignan a una propiedad
        if (nav.extras.state) {
          this.usuario = nav.extras.state['usuario'];
          if (this.usuario.nivelEducacional !== undefined) {
            this.idNivelEducacional = this.usuario.nivelEducacional.id;
          }
          return;
        }
      }
      // Si no vienen datos extra desde la página anterior, quiere decir que el usuario
      // intentó entrar directamente a la página home sin pasar por el login,
      // de modo que el sistema debe enviarlo al login para que inicie sesión.
      this.router.navigate(['/ingreso']);

    });
  }


  public ngOnInit(): void {
  }
  public ngAfterViewInit(): void {
    if (this.itemTitulo) {
      const animation = this.animationController
        .create()
        .addElement(this.itemTitulo.nativeElement)
        .iterations(Infinity)
        .duration(3000)
        .keyframes([
          { offset: 0, transform: 'scale(1) rotate(0)' },
          { offset: 0.5, transform: 'scale(1) rotate(1deg)' },
          { offset: 1, transform: 'scale(1) rotate(0) ' },
        ]);

      animation.play();
    }
  }

  async mostrarMensaje(mensaje: string, duracion?: number) {
    // Permite mostrar un mensaje emergente que dura unos pocos segundos y desaparece. El mensaje es asincrónico, 
    // los que permite que el mensaje se pueda ver incluso cuando ya ha cambiado a la siguiente página.
    const toast = await this.toastController.create({
        message: mensaje,
        duration: duracion? duracion: 2000
      });
    toast.present();
  }

  public cerrarSesion(): void {
    this.router.navigate(['/ingreso']);
    this.mostrarMensaje("¡Hasta luego " + this.usuario.nombre + ' ' + this.usuario.apellido + "!");
  }
}
