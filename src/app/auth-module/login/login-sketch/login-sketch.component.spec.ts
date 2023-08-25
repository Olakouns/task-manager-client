import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSketchComponent } from './login-sketch.component';

describe('LoginSketchComponent', () => {
  let component: LoginSketchComponent;
  let fixture: ComponentFixture<LoginSketchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginSketchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginSketchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
