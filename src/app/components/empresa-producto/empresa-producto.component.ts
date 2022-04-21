import { Component, OnInit } from '@angular/core';
import { EmpresaProducto } from 'src/app/services/empresa-producto.service';
import { empresaService } from 'src/app/services/empresa.service';
import { SucursalProducto } from 'src/app/models/sucursal-producto.model';


@Component({
  selector: 'app-empresa-producto',
  templateUrl: './empresa-producto.component.html',
  styleUrls: ['./empresa-producto.component.scss'],
  providers:[EmpresaProducto,empresaService]
})
export class EmpresaProductoComponent implements OnInit {
public empresaProductoModelGet: EmpresaProducto;
public sucursalProductoModelPost:SucursalProducto;
public token;
public validation: Boolean=true;

  constructor(public _empresaProducto:EmpresaProducto,public _empresaService: empresaService) {
    this.sucursalProductoModelPost = new SucursalProducto('','','','',0,0,0);
    this.token=_empresaService.obtenerToken();
  }

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos(){
    this._empresaProducto.obtenerProductoEmpresa(this.token).subscribe(
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
    this._empresaProducto.enviarProductoSucursal(this.sucursalProductoModelPost,this.token).subscribe(
      (response)=>{
        if(response.empresa==0){
          this.validation=false;
        }else{
          this.validation=true;
          this.getProductos();
        }
      },
      (error)=>{
        console.log(<any>error);
      }
    )
  }


}
