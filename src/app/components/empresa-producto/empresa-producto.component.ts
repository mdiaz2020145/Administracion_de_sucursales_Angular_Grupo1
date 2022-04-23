import { Component, OnInit } from '@angular/core';
import { ServicesProductos } from 'src/app/services/empresa-producto.service';
import { EmpresaProducto } from 'src/app/models/empresa-producto.model';
import { empresaService } from 'src/app/services/empresa.service';
import { SucursalProducto } from 'src/app/models/sucursal-producto.model';


@Component({
  selector: 'app-empresa-producto',
  templateUrl: './empresa-producto.component.html',
  styleUrls: ['./empresa-producto.component.scss'],
  providers:[ServicesProductos,empresaService]
})
export class EmpresaProductoComponent implements OnInit {
public empresaProductoModelPost: EmpresaProducto;
public empresaProductoModelGet: EmpresaProducto;
public empresaProductoModelGetId: EmpresaProducto;
public sucursalProductoModelPost:SucursalProducto;
public token;
public validation: Boolean=true;

  constructor(public _servicesProducto:ServicesProductos, public _empresaService: empresaService) {
    this.empresaProductoModelPost = new EmpresaProducto('','','',0,0);
    this.empresaProductoModelGetId = new EmpresaProducto('','','',0,0);
    this.sucursalProductoModelPost = new SucursalProducto('','','','',0,0,0);
    this.token=_empresaService.obtenerToken();
  }

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos(){
    this._servicesProducto.obtenerProductoEmpresa(this.token).subscribe(
      (response)=>{
        if(response.empresa==0){
          this.validation=false;
        }else{
          this.validation=true;
          this.empresaProductoModelGet =response.Productos;
        }
        console.log(response)
      },
      (error)=>{ console.log(<any>error)}
    )

  }

  postProductos(){
    this._servicesProducto.enviarProductoSucursal(this.sucursalProductoModelPost,this.token).subscribe(
      (response)=>{
          this.getProductos();
      },
      (error)=>{
        console.log(<any>error);
      }
    )
  }

  postAgregarProducto(){
    this._servicesProducto.agregarProducto(this.empresaProductoModelPost,this.token).subscribe(
      (response)=>{
          this.getProductos();
      },
      (error)=>{
        console.log(<any>error);
      }
    )
  }

 getProductosId(idProducto){
    this._servicesProducto.obtenerProductoId(idProducto, this.token).subscribe(
      (response)=>{
        if(response.producto==0){
          this.validation=false;
        }else{
          this.validation=true;
          this.empresaProductoModelGetId = response.Producto;
        }
        console.log(this.empresaProductoModelGetId);

      },
      (error)=>{
        console.log(<any>error)
      }
    )
 }

  putProductos(){
    this._servicesProducto.editarProducto(this.empresaProductoModelGetId, this.token).subscribe(
      (response)=>{
        console.log(response);
        if(response.producto==0){
          this.validation=false;
        }else{
          this.validation=true;
          this.getProductos();
        }
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  deleteProducto(idProducto){
    this._servicesProducto.eliminarProducto(idProducto, this.token).subscribe(
      (response)=>{
        console.log(response);
        if(response.producto==0){
          this.validation=false;
        }else{
          this.validation=true;
          this.getProductos();
        }

      },
      (error)=>{
        console.log(error);
      }
    )
  }

}
