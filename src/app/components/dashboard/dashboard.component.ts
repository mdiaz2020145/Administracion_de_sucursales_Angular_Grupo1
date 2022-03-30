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

  constructor(private _empresaService: empresaService) {
      this.empresaModelPost = new usuarios('','','','','','');
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

}
