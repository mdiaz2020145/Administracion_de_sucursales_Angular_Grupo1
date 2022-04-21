import { Component, OnInit } from '@angular/core';
import { SucursalProducto } from 'src/app/models/sucursal-producto.model';
import { sucursales } from 'src/app/models/sucursales.model';
import { SucursalProductoService } from 'src/app/services/empresa-sucursal.service';
import { empresaService } from 'src/app/services/empresa.service';
import { SucursalService } from 'src/app/services/sucursal.service';

@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.scss'],
  providers: [SucursalService, empresaService]
})
export class SucursalesComponent implements OnInit {
  public sucursalProductoModelGetId: SucursalProducto;
  public sucursalModelGet: sucursales;
  public token;
  public validation: Boolean=true;

  constructor(public _sucursalProducto:SucursalProductoService,public _sucursalService: SucursalService, public _empresaService: empresaService) {
    this.sucursalProductoModelGetId = new SucursalProducto('','','','',0,0,0);
    this.token=_empresaService.obtenerToken();
   }

  ngOnInit(): void {
    this.getEmpresa();
  }

  getEmpresa(){
    this._sucursalService.obtenerSucursal(this.token).subscribe(
      (response)=>{

        if(response.empresa==0){
          this.validation=false;
        }else{
          this.validation=true;
          this.sucursalModelGet =response.Sucursales;
        }
        console.log(response)

        console.log(this.sucursalModelGet)
      },
      (error)=>{ console.log(<any>error)}
    )
  }

  getSucursalId(idSucursal){
    this._sucursalProducto.obtenerProductoSucursal(idSucursal,this.token).subscribe(
      (response)=>{
        if(response.empresa==0){
          this.validation=false;
        }else{
          this.validation=true;
          this.sucursalProductoModelGetId =response.Productos;
        }
        console.log(response)
        
      },
      (error)=>{
        console.log(<any>error);
      }

    )

    }
}
