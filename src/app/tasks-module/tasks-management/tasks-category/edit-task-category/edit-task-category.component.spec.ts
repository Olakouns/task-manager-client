import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaskCategoryComponent } from './edit-task-category.component';

describe('EditTaskCategoryComponent', () => {
  let component: EditTaskCategoryComponent;
  let fixture: ComponentFixture<EditTaskCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTaskCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTaskCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
