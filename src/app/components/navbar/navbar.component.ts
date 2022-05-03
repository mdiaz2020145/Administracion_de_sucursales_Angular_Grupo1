import { Component, OnInit } from '@angular/core';
import { empresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [empresaService]
})
export class NavbarComponent implements OnInit {

  constructor(
    public _empresaService: empresaService
  ) { }

  ngOnInit(): void {
  }

  cerrarSesion(){
    localStorage.clear();
  }
}
