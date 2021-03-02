import { Injectable } from '@angular/core'
import { Disco } from 'src/app/entidades/disco';


@Injectable(/* { providedIn : root } */)
export class DiscosService {
  static listarDiscos(): Disco[] {
    throw new Error('Method not implemented.');
  }
  private discos:Disco[] = []

    // En el constructor de un servicio tambien podemos solicitar la inyección de dependendcias
  public constructor() {
    console.log("Creando DiscosService")
  }

  public listarDiscos():Disco[] {
    /* Devolvemos el clon del array
    nos permitimos la licendida de hacerlo JSON
    si los discos tuvieran funciones se perderian
    */
    let discosAux:Disco[] = JSON.parse(JSON.stringify(this.discos))
    return discosAux
  }

  public buscarDisco(id:number):Disco{
    for (let d of this.discos) {
        if(d.id == id) {
          return JSON.parse(JSON.stringify(d))
        }
    }
  }

  public insertarDisco(disco:Disco):void {
    this.discos.push(disco)
  }

  public modificarDisco(disco:Disco):void {
    for (let a=0; a < this.discos.length; a++) {
      if (this.discos[a].id == disco.id) {
        this.discos[a] = disco
        return
      }
    }
  }

  public borrarDisco(disco:Disco):void {
    for (let a=0; a < this.discos.length; a++) {
      if (this.discos[a].id == disco.id) {
        this.discos.slice(a,1)
        return
      }
    }
  }
}