import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empresas } from 'src/app/models/empresa.model';
import { empresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [empresaService]
})
export class LoginComponent implements OnInit {
  public loginEmpresa: Empresas;
  constructor(private _empresaService: empresaService, private _router: Router) {
    this.loginEmpresa = new Empresas(
      '',
      '',
      '',
      '',
      '',
      ''
    );
  }

  ngOnInit(): void {
  }

  loginTokenPromesa(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._empresaService.login(this.loginEmpresa, "true").subscribe(
        (response) => {
          localStorage.setItem('token', response.token);
          resolve(response)
        },
        (error) => {
          console.log(<any>error);
        }
      )
    })
  }

  login() {
    this._empresaService.login(this.loginEmpresa, "false").subscribe(
      (response) => {
        this.loginTokenPromesa().then(respuesta => {
          localStorage.setItem('identidad', JSON.stringify(response.empresa));
          if (this._empresaService.obtenerIdentidad().rol === 'EMPRESA') {
            this._router.navigate(['/empresa/inicio']);
          } else if (this._empresaService.obtenerIdentidad().rol === 'ADMIN') {
            this._router.navigate(['/admin/dashboard']);
          }

        });
      },
      (error) => {
        console.log(<any>error);
      }
    )
  }

}
