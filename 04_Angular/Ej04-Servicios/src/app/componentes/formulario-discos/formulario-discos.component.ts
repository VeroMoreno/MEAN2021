import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Disco } from 'src/app/entidades/disco';
import { DiscosService } from 'src/app/servicios/discos.service';

@Component({
  selector: 'app-formulario-discos',
  templateUrl: './formulario-discos.component.html'
})
export class FormularioDiscosComponent implements OnInit {
  public mensaje:string
  public error:string
  public disco:Disco //undefined

  constructor(
    private router:Router,
    private _discoService:DiscosService,
    private activatedRouter:ActivatedRoute) {
    console.log("Creando una instancia de formularioDiscos")
    this.disco = new Disco()
    let idDiscoSel = activatedRouter.snapshot.params.id
      if(idDiscoSel) {
        this.disco = _discoService.buscarDisco(idDiscoSel)
      } else {
        this.disco = new Disco()
      }
  }

  ngOnInit(): void {
  }

  public insertarDisco():void {
    // validar
    if (!this.disco.titulo || this.disco.titulo.trim()=='') {
      this.error = "el titulo es obligatorio"
      return
    }
    this._discoService.insertarDisco(this.disco)
    // navegar al listado
    this.router.navigateByUrl("/listadoDiscos")
  }

  public modificarDisco():void {
    this._discoService.modificarDisco(this.disco)
  }

  public borrarDisco():void {
    this._discoService.borrarDisco(this.disco)
  }

  public vaciarFormulario():void {
    this.disco = new Disco()
  }

}
