import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CentroComponent } from './agujeros-mapa.component';

describe('CentroComponent', () => {
  let component: CentroComponent;
  let fixture: ComponentFixture<CentroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CentroComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CentroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});