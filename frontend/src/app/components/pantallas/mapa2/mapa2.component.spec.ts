import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mapa2Component } from './mapa2.component';

describe('Mapa2Component', () => {
  let component: Mapa2Component;
  let fixture: ComponentFixture<Mapa2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mapa2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mapa2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
