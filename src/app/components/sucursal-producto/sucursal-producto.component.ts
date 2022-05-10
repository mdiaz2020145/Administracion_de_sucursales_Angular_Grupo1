import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SucursalProducto } from 'src/app/models/sucursal-producto.model';
import { SucursalProductoService } from 'src/app/services/empresa-sucursal.service';
import { empresaService } from 'src/app/services/empresa.service';
import { SucursalService } from 'src/app/services/sucursal.service';

@Component({
  selector: 'app-sucursal-producto',
  templateUrl: './sucursal-producto.component.html',
  styleUrls: ['./sucursal-producto.component.scss'],
  providers: [empresaService, SucursalProductoService]
})
export class SucursalProductoComponent implements OnInit {

  chartOptions={
    responsive: true,
  };

  //Nombre de los productos 
  chartLabel:any = [];

  //Cantidad de producto 
  chartData:any=[];
  chartColors:any =[
  {
    backgroundColor: []
  }
  ];

  chartLegend = true;
  chartPlugins = [];

  public sucursalProductoModelGetId=[];
  public token;
  public buscar;
  public validation: Boolean=true;
  public sucursalGetId : SucursalProducto;
  public productoGetNombre: SucursalProducto;

  constructor(public _sucursalProducto:SucursalProductoService,public _empresaService: empresaService, public _sucursalService: SucursalService, public _activatedRoute: ActivatedRoute) {
    //this.sucursalProductoModelGetId = new SucursalProducto('','','','',0,0,0);
    this.token=_empresaService.obtenerToken();
    this.sucursalGetId = new SucursalProducto ("","","","",0,0,0);
    this.productoGetNombre = new SucursalProducto('','','','',0,0,0);
   }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta) => {
      this.getSucursalId(dataRuta.get('idSucursal'))
      //this.getProductoNombre(dataRuta.get('nombreProducto'))
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
        this.sucursalProductoModelGetId.forEach(elemento=>{
          this.chartLabel.push(elemento.nombreProducto);
          this.chartData.push(elemento.vendido);
          this.chartColors[0].backgroundColor.push(`#${Math.floor(Math.random()*16777215).toString(16)}`)   
        })
        console.log(response.ProductosSucursal);
      },
      (error)=>{
        console.log(<any>error);
      }

    )

  }

  getProductoNombre(idSucursal, nombre){
    this._sucursalService.obtenerProductoSucursalNombre(idSucursal,nombre,this.token).subscribe(
      (response)=>{
          if(response.empresa==0){
            this.validation = false;
          }else{
            this.validation=true;
            this.productoGetNombre = response.Producto
            this.productoGetNombre.cantidadProducto = 0
            console.log(this.productoGetNombre)
          }
      },
      (error)=>{
        console.log(<any>error);
      }
    )

  }

  putVenta(){
    this._sucursalService.ventaProductoSucursal(this.productoGetNombre,this.token).subscribe(
      (response)=>{
          this.getSucursalId(this.productoGetNombre.idSucursal);
          console.log(this.productoGetNombre)
      },
      (error)=>{
        console.log(<any>error);
      }
    )
  }


  getProductoStockMayor(){
    
  }


}
