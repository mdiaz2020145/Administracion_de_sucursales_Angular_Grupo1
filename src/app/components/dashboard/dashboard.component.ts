import { Component, OnInit } from '@angular/core';
import { Empresas } from 'src/app/models/empresa.model';
import { empresaService } from 'src/app/services/empresa.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [empresaService]
})
export class DashboardComponent implements OnInit {

  tipo=[
    {nombre: "Restaurante",},
    {nombre:"Construccion"},
    {nombre:"Colegio"},
    {nombre:"Tecnologica"},
    {nombre: "Alimentos"}
  ]
  //Empresa
  public empresaModelPost: Empresas;
  public empresaModelGet: Empresas;
  public empresaModelGetId: Empresas;
  public token;
  public validation: Boolean=true;

  constructor(public _empresaService: empresaService) {
      this.empresaModelPost = new Empresas('','','','','','');
      this.empresaModelGetId = new Empresas('','','','','','');
      this.token=_empresaService.obtenerToken();
  }

  ngOnInit(): void {
    this.getEmpresa();
  }

  getEmpresa(){
    this._empresaService.obtenerEmpresa(this.token).subscribe(
      (response)=>{

        console.log(response)
        if(response.empresa==0){
          this.validation=false;
        }else{
          this.validation=true;
          this.empresaModelGet =response.empresa;
        }
        console.log(this.empresaModelGet)
      },
      (error)=>{ console.log(<any>error)}
    )
  }

  getEmpresaId(idEmpresa){
    this._empresaService.obtenerEmpresaId(idEmpresa, this.token).subscribe(
      (response)=>{
        if(response.empresa==0){
          this.validation=false;
        }else{
          this.validation=true;
          this.empresaModelGetId = response.Empresa;
        }
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
    this._empresaService.eliminarEmpresa(idEmpresa, this.token).subscribe(
      (response)=>{
        console.log(response);
        if(response.empresa==0){
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

  putEmpresa(){
    this._empresaService.editarEmpresa(this.empresaModelGetId, this.token).subscribe(
      (response)=>{
        console.log(response);
        if(response.empresa==0){
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
