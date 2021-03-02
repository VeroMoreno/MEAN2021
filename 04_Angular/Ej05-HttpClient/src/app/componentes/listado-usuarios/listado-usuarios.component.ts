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

  constructor(private httpClient:HttpClient) { }

  ngOnInit(): void {
  }

  public listarUsuarios():void {
    //this.httpClient.get("URL", headers?):Observable
    //                delete
    //
    //this.httpCliente.post("USR", body?, headers?):Observable
    this.usuarios = [
      {
        first_name : "Asdrubal"
      },
      {
        first_name : "Ringo"
      }
    ]

    let obs:Observable<any> = this.httpClient.get("https://reqres.in/api/users")
    obs.subscribe(
      function(resultado) {
        console.log(resultado.data)
        this.usuarios = resultado.data
      },
      function(error) {
        console.log(error)
      }
    )
  }

}
