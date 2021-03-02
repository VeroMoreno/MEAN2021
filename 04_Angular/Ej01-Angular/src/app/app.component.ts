import { Component } from '@angular/core';
import { Disco } from './entidades/disco';

// Decorador
// Albergan configuracion
@Component ({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // public > es para la plantilla
  // private > es para el componente
  public mensaje:string = "Yipi a yeye, yipi ayo!"
  public numero1:number = 10
  public numero2:number = 20

  //Asociaremos las cajas de texto del formulario a las propiedades de este objeto:
  //Nos aseguramos de que la propiedad tenga valor aqui o en el constructor
  public disco:Disco = new Disco()

  // Declaramos un array aqui para los discos. No es el lugar correcto
  public discos:Disco[] = []

  public estilo:string = "normal"

  public insertarDisco():void {
    console.log("Insertar disco: ", this.disco)
    this.discos.push(this.disco)
    this.vaciarFormulario()
  }

  public vaciarFormulario():void {
    /*this.disco.titulo = ""
    this.disco.grupo = ""
    this.disco.year = null*/
    // Podemos poner un disco nuevo y lo hacemosl del tirón
    this.disco = new Disco()
  }
}
