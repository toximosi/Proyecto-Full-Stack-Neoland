import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioObjetoCrearComponent } from './usuario-objeto-crear.component';

describe('UsuarioObjetoCrearComponent', () => {
  let component: UsuarioObjetoCrearComponent;
  let fixture: ComponentFixture<UsuarioObjetoCrearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioObjetoCrearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioObjetoCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
