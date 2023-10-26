import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-correcto',
  templateUrl: './correcto.page.html',
  styleUrls: ['./correcto.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CorrectoPage implements OnInit {
  public datoFinal : string = '';
  constructor(
    private activatedRoute: ActivatedRoute, 
    private router: Router
    ) { 
    this.activatedRoute.queryParams.subscribe(params => { 

      const nav = this.router.getCurrentNavigation();
      if (nav) {
        // Si tiene datos extra, se rescatan y se asignan a una propiedad
        if (nav.extras.state) {
          this.datoFinal = nav.extras.state['dato'];
          return;
        }
      }
    });
  }

  ngOnInit() {
  }
  public mostrarPassword():void{
    this.datoFinal;
  }
}
