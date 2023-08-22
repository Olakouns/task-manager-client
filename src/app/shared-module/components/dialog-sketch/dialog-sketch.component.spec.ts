import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSketchComponent } from './dialog-sketch.component';

describe('DialogSketchComponent', () => {
  let component: DialogSketchComponent;
  let fixture: ComponentFixture<DialogSketchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSketchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogSketchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
