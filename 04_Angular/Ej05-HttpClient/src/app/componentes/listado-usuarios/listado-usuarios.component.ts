import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html'
})
export class ListadoUsuariosComponent implements OnInit {

  // Esta mal utilizar el objeto HTTP Client en un componente
  public usuarios:any[] = []
  public imagen:string = "#"

  constructor(private httpClient:HttpClient) { }

  ngOnInit(): void {
  }

  public listarUsuarios():void {
    /* this.httpClient.get("URL", headers?):Observable
                      delete

    this.httpCliente.post("USR", body?, headers?):Observable */

    let obs:Observable<any> = this.httpClient.get("https://reqres.in/api/users")
    obs.subscribe(
      resultado => this.usuarios = resultado.data,
      error => console.log(error)
    )
  }

    //Experimento de [src]
  //------------------------------------
  public rutaImagen:string = ""

  public imagen1():void{
    this.rutaImagen = "https://reqres.in/img/faces/6-image.jpg"
  }

  public imagen2():void{
    this.rutaImagen = "https://reqres.in/img/faces/2-image.jpg"
  }
}
