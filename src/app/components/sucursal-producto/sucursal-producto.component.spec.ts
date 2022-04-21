import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucursalProductoComponent } from './sucursal-producto.component';

describe('SucursalProductoComponent', () => {
  let component: SucursalProductoComponent;
  let fixture: ComponentFixture<SucursalProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SucursalProductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SucursalProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
