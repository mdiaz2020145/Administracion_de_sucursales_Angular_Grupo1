import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscarEmpresa'
})
export class BuscarEmpresaPipe implements PipeTransform {

  transform(empresas: any, buscarEmp: any): any {
    if(buscarEmp == undefined){
      return empresas;
    }else{
      return empresas.filter( empresa =>{
        return empresa.nombreEmpresa.toLowerCase().includes(buscarEmp.toLowerCase());
      })
    }
  }

}
