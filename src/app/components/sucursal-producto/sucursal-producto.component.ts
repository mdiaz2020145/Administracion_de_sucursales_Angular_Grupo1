import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SucursalProducto } from 'src/app/models/sucursal-producto.model';
import { SucursalProductoService } from 'src/app/services/empresa-sucursal.service';
import { empresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-sucursal-producto',
  templateUrl: './sucursal-producto.component.html',
  styleUrls: ['./sucursal-producto.component.scss'],
  providers: [empresaService, SucursalProductoService]
})
export class SucursalProductoComponent implements OnInit {
  public sucursalProductoModelGetId=[];
  public token;
  public validation: Boolean=true;

  constructor(public _sucursalProducto:SucursalProductoService,public _empresaService: empresaService, public _activatedRoute: ActivatedRoute) {
    //this.sucursalProductoModelGetId = new SucursalProducto('','','','',0,0,0);
    this.token=_empresaService.obtenerToken();
   }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta) => {
      this.getSucursalId(dataRuta.get('idSucursal'))
    })
  }

  getSucursalId(idSucursal){
    this._sucursalProducto.obtenerProductoSucursal(idSucursal,this.token).subscribe(
      (response)=>{
        if(response.empresa==0){
          this.validation=false;
        }else{
          this.validation=true;
          this.sucursalProductoModelGetId =response.ProductosSucursal;
        }
        console.log(response.ProductosSucursal);

      },
      (error)=>{
        console.log(<any>error);
      }

    )

  }


}
