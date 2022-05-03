import { Component, OnInit } from '@angular/core';
import { Empresas } from 'src/app/models/empresa.model';
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
  public empresaModelGet = [];
  public sucursalProductoModelGetId: SucursalProducto;
  public sucursalPost:sucursales;
  public sucursalGetId: sucursales; 
  public sucursalModelGet: sucursales;
  public token;
  public validation: Boolean = true;

  constructor(public _sucursalProducto: SucursalProductoService, public _sucursalService: SucursalService, public _empresaService: empresaService) {
    this.sucursalProductoModelGetId = new SucursalProducto('', '', '', '', 0, 0, 0);
    this.sucursalPost = new sucursales('','','','');
    this.sucursalGetId = new sucursales('','','','');
    this.token = _empresaService.obtenerToken();
  }

  ngOnInit(): void {
    this.getEmpresa();
    this.getObtenerEmpresa();
  }

  getEmpresa() {
    this._sucursalService.obtenerSucursal(this.token).subscribe(
      (response) => {

        if (response.empresa == 0) {
          this.validation = false;
        } else {
          this.validation = true;
          this.sucursalModelGet = response.Sucursales;
        }
        console.log(response)

        console.log(this.sucursalModelGet)
      },
      (error) => { console.log(<any>error) }
    )
  }

  getSucursalId(idSucursal) {
    this._sucursalProducto.obtenerProductoSucursal(idSucursal, this.token).subscribe(
      (response) => {
        if (response.empresa == 0) {
          this.validation = false;
        } else {
          this.validation = true;
          this.sucursalProductoModelGetId = response.Productos;
        }
        console.log(response)

      },
      (error) => {
        console.log(<any>error);
      }

    )

  }

  getObtenerEmpresa() {
    this._empresaService.obtenerEmpresa(this.token).subscribe(
      (response)=>{
        this.empresaModelGet=response.empresa;
        console.log(this.empresaModelGet)
      },
      (error)=>{ console.log(<any>error)}
    )
  }

  mostrarSucursal(idEmpresa) {
    this._empresaService.obtenerEmpresaId(idEmpresa, this.token).subscribe(
      (response)=>{
        this._sucursalService.obtenerSucursalEmpresa(response.Empresa._id,this.token).subscribe(
          (response)=>{
            this.sucursalModelGet=response.Sucursales;
          },
          (error)=>{ console.log(<any>error)}
        )
      },
      (error)=>{ console.log(<any>error)}
    )
  }


  postAgregarSucursal(agregarSucursalForm){
    this._sucursalService.agregarSucursal(this.sucursalPost,this.token).subscribe(
      (response)=>{
        this.getEmpresa();
        agregarSucursalForm.reset();
      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }

  getSucursalesId(idSucursal){
    this._sucursalService.obtenerSucursalId(idSucursal,this.token).subscribe(
      (response)=>{
        if(response.sucursal==0){
          this.validation=false;
        }else{
          this.validation=true;
          this.sucursalGetId = response.sucursal;
        }
        console.log(this.sucursalGetId)
      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }

  putSucursales(){
    this._sucursalService.editarSucursal(this.sucursalGetId,this.token).subscribe(
      (response)=>{
        console.log(response);
        if(response.sucursal==0){
          this.validation=false;
        }else{
          this.validation=true;
          this.getEmpresa();
        }
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  deleteSucursales(idSucursal){
      this._sucursalService.eliminarSucursal(idSucursal,this.token).subscribe(
        (response)=>{
          console.log(response);
          if(response.sucursal==0){
            this.validation=false;
          }else{
            this.validation=true;
            this.getEmpresa();
          }
        },
        (error)=>{
          console.log(error);
        }
      )
  }
}
