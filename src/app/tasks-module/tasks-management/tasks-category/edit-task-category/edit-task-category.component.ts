import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TasksManagerService} from "../../../services/tasks-manager.service";
import {Dashboard} from "../../../../models/dashboard";
import {TaskCategory} from "../../../../models/task-category";

@Component({
  selector: 'app-edit-task-category',
  templateUrl: './edit-task-category.component.html',
  styleUrls: ['./edit-task-category.component.scss']
})
export class EditTaskCategoryComponent implements OnInit {
  title: String = "Add new Task Category";
  form: FormGroup;
  isLoading: boolean = false;
  mode: String;
  validateText: String = "Add";

  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<EditTaskCategoryComponent>,
              public tasksManagerService: TasksManagerService,
              @Inject(MAT_DIALOG_DATA) public data: {
                dashboardId: string,
                taskCategory: TaskCategory
              }) {
    if (this.data.taskCategory == null) {
      this.data.taskCategory = new TaskCategory();
    } else {
      this.title = "Task category Modification";
      this.validateText = "Save changes"
    }
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      indexColor: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.isLoading = true;
    if (this.data.taskCategory.id) {
      this.tasksManagerService.updateTaskCategory(this.data.dashboardId, this.data.taskCategory.id, this.data.taskCategory).subscribe({
        next: response => {
          this.isLoading = false;
          this.dialogRef.close(response);
        },
        error: err => {
          this.isLoading = false;
          // todo : show error here
        }
      })
    } else {
      this.tasksManagerService.addTaskCategory(this.data.dashboardId, this.data.taskCategory).subscribe({
        next: response => {
          this.isLoading = false;
          this.dialogRef.close(response);
        },
        error: err => {
          this.isLoading = false;
          // todo : show error here
        }
      })
    }

  }
}
