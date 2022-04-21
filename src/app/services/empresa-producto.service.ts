import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SucursalProducto } from '../models/sucursal-producto.model';

@Injectable({
  providedIn: 'root'
})
export class EmpresaProducto {
  public url: String = 'http://localhost:3000/api';
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json')
  public token;
  public identidad;

  constructor(public _http: HttpClient) { }
  
  obtenerProductoEmpresa(token):Observable<any>{
    let headersToken=this.headersVariable.set('Authorization', token)
    return this._http.get(this.url + '/obtenerProductoEmpresa', { headers: headersToken })
  }

  enviarProductoSucursal(modeloSucursalProducto:SucursalProducto,token):Observable<any>{
    let parametros = JSON.stringify(modeloSucursalProducto);
    let headersToken=this.headersVariable.set('Authorization', token)

    return this._http.post(this.url + '/envioProductos',parametros,{headers: headersToken});
  }
}
