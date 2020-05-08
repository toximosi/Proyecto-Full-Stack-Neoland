import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgujerosMapaComponent } from './agujeros-mapa.component';

describe('CentroComponent', () => {
  let component: AgujerosMapaComponent;
  let fixture: ComponentFixture<AgujerosMapaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AgujerosMapaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgujerosMapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
