import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SucursalProducto } from '../models/sucursal-producto.model';
import { EmpresaProducto } from '../models/empresa-producto.model';

@Injectable({
  providedIn: 'root'
})
export class ServicesProductos {
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

  agregarProducto(modeloProducto: EmpresaProducto, token): Observable<any> {
    let parametros = JSON.stringify(modeloProducto);
    let headersToken=this.headersVariable.set('Authorization', token)
    return this._http.post(this.url + '/agregarProductos', parametros, { headers: headersToken })
  }

  eliminarProducto(id: String, token): Observable<any> {
    let headersToken=this.headersVariable.set('Authorization', token)
    return this._http.delete(this.url + '/eliminarProductos/' + id, { headers: headersToken})
  }

 obtenerProductoId(id: String, token): Observable<any> {
    let headersToken=this.headersVariable.set('Authorization', token)
    return this._http.get(this.url + '/obtenerProductoId/' + id, { headers: headersToken })
  }

  editarProducto(modeloProducto: EmpresaProducto,token): Observable<any> {
    let parametros = JSON.stringify(modeloProducto);
    let headersToken=this.headersVariable.set('Authorization', token)
    return this._http.put(this.url + '/editarProductos/' + modeloProducto._id, parametros, { headers: headersToken });
  }
}
