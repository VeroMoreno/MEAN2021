import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { Persona } from "../entidades/persona";

@Injectable( { providedIn : 'root' })
export class ServicioSubject {

    //private subject:Subject<Persona>
    private subject:BehaviorSubject<Persona>

    public constructor(){
        //this.subject = new Subject()
        // Si quieres BehaviorSubject siempre tienes que proporcionar un valor
        this.subject = new BehaviorSubject(new Persona("Veri"))
    }

    // S U B J E C T - Nos promete un stream de personas
    public getPersona():Subject<Persona>{
        return this.subject;
    }

    public setNombre(nombre:string):void{
        let persona = new Persona(nombre)
        // El que esté atento, allá va una persona.
        this.subject.next(persona)
    }

}