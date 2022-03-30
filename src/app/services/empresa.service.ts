import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, observable } from "rxjs";
import { usuarios } from "../models/empresa.model";

@Injectable({
    providedIn: 'root'
})
export class empresaService{
    public url: String = 'http://localhost:3000/api';
    public headersVariable = new HttpHeaders().set('Content-Type','application/json')


    constructor(public _http: HttpClient){}

    agregarEmpresa(modeloEmpresa:usuarios): Observable<any>{
        let parametros = JSON.stringify(modeloEmpresa);

        return this._http.post(this.url + '/registrar', parametros, {headers: this.headersVariable})
    }
}