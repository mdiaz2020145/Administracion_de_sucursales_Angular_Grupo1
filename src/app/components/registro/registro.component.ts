import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empresas } from 'src/app/models/empresa.model';
import { empresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  providers: [empresaService]
})
export class RegistroComponent implements OnInit {

  tipo=[
    {nombre: "Restaurante",},
    {nombre:"Construccion"},
    {nombre:"Colegio"},
    {nombre:"Tecnologica"},
    {nombre: "Alimentos"}
  ]

  public empresaModelPost: Empresas;

  constructor(private _empresaService: empresaService, private _router: Router) {
      this.empresaModelPost = new Empresas('','','','','','');
  }

  ngOnInit(): void {
  }

  postEmpresa(){
    this._empresaService.agregarEmpresa(this.empresaModelPost).subscribe(
      (response)=>{
        console.log(response)
        this._router.navigate(["login"])
      },
      (error)=>{
        console.log(<any>error);
      }
    )
  }
}
