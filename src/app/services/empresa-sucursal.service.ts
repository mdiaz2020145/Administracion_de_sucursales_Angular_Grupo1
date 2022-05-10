import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })

export class SucursalProductoService {
public url: String = 'http://localhost:3000/api';
public headersVariable = new HttpHeaders().set('Content-Type', 'application/json')
  public token;
  public identidad;
  constructor(public _http: HttpClient) {}

  obtenerProductoSucursal(id: String,token):Observable<any>{
    let headersToken=this.headersVariable.set('Authorization', token)
    return this._http.get(this.url + '/obtenerProductosSucursal/'+id, { headers: headersToken })
  }

  


}
