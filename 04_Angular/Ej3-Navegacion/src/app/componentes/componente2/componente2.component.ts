import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-componente2',
  templateUrl: './componente2.component.html'
})
export class Componente2Component implements OnInit {

  public dato1:string
  public dato2:string

  /* INYECCION DE DEPENDENCIAS en Angular
  - Podemos solicitar en el constructor de un componente que nos inyecten los objetos.

  - Activated routed es una clase cuyas instancias representan a la ruta presente en la barra de navegación.
  */
  constructor(ruta:ActivatedRoute) {
    console.log("Creando componente 2")
    // Accedemos a los valores contenidos en la ruta
    ruta.snapshot.params["dato1"]
    this.dato1 = ruta.snapshot.params.dato1
    this.dato2 = ruta.snapshot.params.dato1
  }

  ngOnInit(): void {
  }

}
