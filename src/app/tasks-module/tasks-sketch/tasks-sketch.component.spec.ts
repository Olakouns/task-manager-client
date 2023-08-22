import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksSketchComponent } from './tasks-sketch.component';

describe('TasksSketchComponent', () => {
  let component: TasksSketchComponent;
  let fixture: ComponentFixture<TasksSketchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksSketchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksSketchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
