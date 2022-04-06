import { Component, OnInit } from '@angular/core';
import { usuarios } from 'src/app/models/empresa.model';
import { empresaService } from 'src/app/services/empresa.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [empresaService]
})
export class DashboardComponent implements OnInit {

  //Empresa
  public empresaModelPost: usuarios;
  public empresaModelGet: usuarios;
  public empresaModelGetId: usuarios;

  constructor(private _empresaService: empresaService) {
      this.empresaModelPost = new usuarios('','','','','','');
      this.empresaModelGetId = new usuarios('','','','','','');

  }

  ngOnInit(): void {
    this.getEmpresa();
  }

  getEmpresa(){
    this._empresaService.obtenerEmpresa().subscribe(
      (response)=>{
        console.log(response)
        this.empresaModelGet =response.empresa;
        console.log(this.empresaModelGet)
      },
      (error)=>{ console.log(<any>error)}
    )
  }

  getEmpresaId(idEmpresa){
    this._empresaService.obtenerEmpresaId(idEmpresa).subscribe(
      (response)=>{
        
        this.empresaModelGetId = response.Empresa;
        console.log(this.empresaModelGetId);
        
      },
      (error)=>{
        console.log(<any>error)
      }
    )

  }

  postEmpresa(){
    this._empresaService.agregarEmpresa(this.empresaModelPost).subscribe(
      (response)=>{
        console.log(response)
        this.getEmpresa();
      },
      (error)=>{
        console.log(<any>error);
      }
    )
  }

  deleteEmpresa(idEmpresa){
    this._empresaService.eliminarEmpresa(idEmpresa).subscribe(
      (response)=>{
        console.log(response);
        this.getEmpresa();
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  putEmpresa(){
    this._empresaService.editarEmpresa(this.empresaModelGetId).subscribe(
      (response)=>{
        console.log(response);
        this.getEmpresa();
      },
      (error)=>{
        console.log(error);
      }
    )
  }

}
