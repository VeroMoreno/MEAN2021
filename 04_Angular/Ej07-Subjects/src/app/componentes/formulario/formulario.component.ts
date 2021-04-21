import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/entidades/persona';
import { ServicioMemoria } from 'src/app/servicios/servicioMemoria';
import { ServicioSubject } from 'src/app/servicios/servicioSubject';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html'
})
export class FormularioComponent implements OnInit {

  public nombre:string

  public persona:Persona

  constructor(private servicioMemoria:ServicioMemoria,
              private servicioSubject:ServicioSubject) {
    // this.persona = servicioMemoria.getPersona()
  }

  ngOnInit(): void {
  }

  public guardar():void{
    console.log(this.nombre)
    this.servicioMemoria.setNombre(this.nombre)
    this.servicioSubject.setNombre(this.nombre)
  }

}
