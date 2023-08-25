import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksCategoryComponent } from './tasks-category.component';

describe('TasksCategoryComponent', () => {
  let component: TasksCategoryComponent;
  let fixture: ComponentFixture<TasksCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
