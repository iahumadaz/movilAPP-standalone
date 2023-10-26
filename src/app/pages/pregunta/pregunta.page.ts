import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PreguntaPage implements OnInit {
  public usuario : Usuario | undefined;
  public respuesta: string= '';
  public laPregunta: string= '';
  
  constructor(
    private activatedRoute: ActivatedRoute, 
    private router: Router) {
  
      this.activatedRoute.queryParams.subscribe(params => {
        const extras = this.router.getCurrentNavigation()?.extras;
        if (extras && extras.state) {
          this.usuario = extras.state['usuario'];
        } else {
          this.router.navigate(['/ingreso']);
        }
      });
  }
  ngOnInit() {
  }
  public preguntarSecreto():void{
    this.laPregunta = this.usuario!.preguntaSecreta;
    //return this.laPregunta;
  }
  public aPaginaComprobacion():void{
    const dato = this.usuario?.password;
    if(this.usuario?.respuestaSecreta === this.respuesta){
      
      const navExtras:  NavigationExtras= {
        state: {
          dato: dato
        }
      };
      this.router.navigate(['/correcto'], navExtras);
    }else{
      this.router.navigate(['/incorrecto']);
    }
  }
}
