import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegistroComponent } from './components/registro/registro.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SucursalesComponent } from './components/sucursales/sucursales.component';
import { EmpresaProductoComponent } from './components/empresa-producto/empresa-producto.component';
import { SucursalProductoComponent } from './components/sucursal-producto/sucursal-producto.component';
import { InicioUsuarioComponent } from './components/inicio-usuario/inicio-usuario.component';
import { InicioAdmiComponent } from './components/inicio-admi/inicio-admi.component';
import { BuscarPipe } from './pipes/buscar.pipe';
import { BuscarEmpresaPipe } from './pipes/buscar-empresa.pipe';
import { ChartsModule } from '@rinminase/ng-charts';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    RegistroComponent,
    InicioComponent,
    DashboardComponent,
    SucursalesComponent,
    EmpresaProductoComponent,
    SucursalProductoComponent,
    InicioUsuarioComponent,
    InicioAdmiComponent,
    BuscarPipe,
    BuscarEmpresaPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
