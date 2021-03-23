import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable()
  export class UsuariosService {

    public constructor(private httpClient:HttpClient) {

    }
    public listarUsuarios():void {
      let obs:Observable<any> = this.httpClient.get("https://reqres.in/api/users?delay=1")
      obs.subscribe(
        respuesta => respuesta.data,
        error => console.log(error)
      )
    }
}