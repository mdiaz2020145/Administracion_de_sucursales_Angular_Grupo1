import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { Empresas } from "../models/empresa.model";

@Injectable({
  providedIn: 'root'
})
export class empresaService {
  public url: String = 'http://localhost:3000/api';
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json')
  public token;
  public identidad;


  constructor(public _http: HttpClient) { }

  obtenerEmpresa(token): Observable<any> {
    let headersToken=this.headersVariable.set('Authorization', token)
    return this._http.get(this.url + '/encontrarE', { headers: headersToken })
  }

  obtenerEmpresaId(id: String, token): Observable<any> {
    let headersToken=this.headersVariable.set('Authorization', token)
    return this._http.get(this.url + '/encontrarEId/' + id, { headers: headersToken })
  }

  agregarEmpresa(modeloEmpresa: Empresas): Observable<any> {
    let parametros = JSON.stringify(modeloEmpresa);

    return this._http.post(this.url + '/registrar', parametros, { headers: this.headersVariable })
  }

  eliminarEmpresa(id: String, token): Observable<any> {
    let headersToken=this.headersVariable.set('Authorization', token)
    return this._http.delete(this.url + '/eliminarE/' + id, { headers: headersToken})
  }

  editarEmpresa(modeloEmpresa: Empresas,token): Observable<any> {
    let parametros = JSON.stringify(modeloEmpresa);
    let headersToken=this.headersVariable.set('Authorization', token)
    return this._http.put(this.url + '/editarE/' + modeloEmpresa._id, parametros, { headers: headersToken });
  }

  login(empresas, obtenerToken=null): Observable<any> {
    if(obtenerToken != null){
      empresas.obtenerToken=obtenerToken;
    }
    let params=JSON.stringify(empresas);
    return this._http.post(this.url+'/login', params, {headers: this.headersVariable})
  }

  obtenerToken(){
    var token2=localStorage.getItem('token');
    if(token2!=undefined){
      this.token=token2;
    }else{
      this.token='';
    }

    return this.token;
  }

  obtenerIdentidad(){
    var identidad2=JSON.parse(localStorage.getItem('identidad'));
    if(identidad2!=undefined){
      this.identidad=identidad2;
    }else if(identidad2==undefined){
      this.identidad=null;
    }

    return this.identidad;
  }
}
