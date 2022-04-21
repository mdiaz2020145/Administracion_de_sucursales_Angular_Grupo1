import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SucursalService {

  public url: String = 'http://localhost:3000/api';
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json')
  constructor(public _http: HttpClient) { }

  obtenerSucursal(token): Observable<any> {
    let headersToken=this.headersVariable.set('Authorization', token)
    return this._http.get(this.url + '/obtenerSucursales', { headers: headersToken })
  }

  obtenerProductoSucursal(id: String,token):Observable<any>{
    let headersToken=this.headersVariable.set('Authorization', token)
    return this._http.get(this.url + '/obtenerProductosSucursal/'+id, { headers: headersToken })
  }
}
