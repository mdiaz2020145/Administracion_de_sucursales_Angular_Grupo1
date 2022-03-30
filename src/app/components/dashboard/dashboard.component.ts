import { Component, OnInit } from '@angular/core';
import { usuarios } from 'src/app/models/empresa.model';
import { empresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  //Empresa
  public empresaModelPost: usuarios;

  constructor(private _empresaService: empresaService) { 
      this.empresaModelPost = new usuarios('','','','','','');
  }

  ngOnInit(): void {
  }

  
  postEmpresa(){
    this._empresaService.agregarEmpresa(this.empresaModelPost).subscribe(
      (response)=>{
        console.log(response)
      },
      (error)=>{
        console.log(<any>error);
      }
    )
  }

}
