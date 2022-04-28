import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { sucursales } from '../models/sucursales.model';
import { SucursalProducto } from '../models/sucursal-producto.model';

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

  obtenerSucursalEmpresa(idEmpresa: String, token): Observable<any> {
    let headersToken=this.headersVariable.set('Authorization', token)
    return this._http.get(this.url + '/obtenerSucursalesPorEmpresa/'+idEmpresa, { headers: headersToken })
  }

  obtenerProductoSucursal(id: String,token):Observable<any>{
    let headersToken=this.headersVariable.set('Authorization', token)
    return this._http.get(this.url + '/obtenerProductosSucursal/'+id, { headers: headersToken })
  }


  agregarSucursal(modeloSucursal:sucursales,token):Observable<any>{
    let parametros = JSON.stringify(modeloSucursal)
    let headersToken = this.headersVariable.set('Authorization',token)
    return this._http.post(this.url + '/agregarSucursal', parametros,{headers:headersToken})
  }

  obtenerSucursalId(id:String,token):Observable<any>{
    let headersToken = this.headersVariable.set('Authorization',token)
    return this._http.get(this.url +'/obtenerSucursalId/'+id,{headers:headersToken})
  }

  editarSucursal(modeloSucursal:sucursales,token):Observable<any>{
    let parametros = JSON.stringify(modeloSucursal);
    let headersToken=this.headersVariable.set('Authorization', token)
    return this._http.put(this.url + '/editarSucursal/' +modeloSucursal._id,parametros,{headers:headersToken})
  }

  eliminarSucursal(id: String, token):Observable<any>{
    let headersToken=this.headersVariable.set('Authorization', token)
    return this._http.delete(this.url + '/eliminarSucursal/'+ id,{headers: headersToken});
  }

  ventaProductoSucursal(modeloSucursalProducto:SucursalProducto,token):Observable<any>{
    let parametros = JSON.stringify(modeloSucursalProducto);
    let headersToken=this.headersVariable.set('Authorization', token)

    return this._http.post(this.url + '/simularVenta'+ modeloSucursalProducto.nombreProducto, parametros,{headers: headersToken});
  }
}
