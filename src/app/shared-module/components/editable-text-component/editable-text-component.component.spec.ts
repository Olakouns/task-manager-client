import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableTextComponentComponent } from './editable-text-component.component';

describe('EditableTextComponentComponent', () => {
  let component: EditableTextComponentComponent;
  let fixture: ComponentFixture<EditableTextComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditableTextComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditableTextComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
