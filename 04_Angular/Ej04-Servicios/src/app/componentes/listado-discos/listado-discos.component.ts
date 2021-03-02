import { Component, OnInit } from '@angular/core';
import { Disco } from 'src/app/entidades/disco';
import { DiscosService } from 'src/app/servicios/discos.service';

@Component({
  selector: 'app-listado-discos',
  templateUrl: './listado-discos.component.html',
})
export class ListadoDiscosComponent implements OnInit {
    public discos:Disco[] //undefined

  // Los servicios se inyectan
  // jamas crearemos un servicio con NEW
  constructor(private _discosService:DiscosService) {
    console.log("Creando ListadoDiscosComponent")
    this.discos = _discosService.listarDiscos()
  }

  ngOnInit(): void {
  }

  seleccionarDisco(id:number) {
    console.log("ole")
    let obj = this._discosService.buscarDisco(id)
  }
}
