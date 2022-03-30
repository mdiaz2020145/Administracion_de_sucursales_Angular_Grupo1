import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { usuarios } from "../models/empresa.model";

@Injectable({
    providedIn: 'root'
})
export class empresaService{
    public url: String = 'http://localhost:3000/api';
    public headersVariable = new HttpHeaders().set('Content-Type','application/json')


    constructor(public _http: HttpClient){}

    obtenerEmpresa(): Observable<any>{
      return this._http.get(this.url+ '/encontrarE',{headers: this.headersVariable})
    }

    agregarEmpresa(modeloEmpresa:usuarios): Observable<any>{
        let parametros = JSON.stringify(modeloEmpresa);

        return this._http.post(this.url + '/registrar', parametros, {headers: this.headersVariable})
    }
}
