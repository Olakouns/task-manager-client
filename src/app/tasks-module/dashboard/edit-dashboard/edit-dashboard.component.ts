import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Dashboard} from "../../../models/dashboard";
import {TasksManagerService} from "../../services/tasks-manager.service";

@Component({
  selector: 'app-edit-dashboard',
  templateUrl: './edit-dashboard.component.html',
  styleUrls: ['./edit-dashboard.component.scss']
})
export class EditDashboardComponent implements OnInit {

  title: String = "Add new Dashboard";
  form: FormGroup;
  isLoading: boolean = false;
  mode: String;
  validateText: String = "Add";

  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<EditDashboardComponent>,
              public tasksManagerService: TasksManagerService,
              @Inject(MAT_DIALOG_DATA) public data: Dashboard) {
    if (this.data == null) {
      this.data = new Dashboard();
    } else {
      this.title = "Dashboard Modification";
      this.validateText = "Save changes"
    }
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      bordName: ['', [Validators.required]],
      descriptions: ['', [Validators.required, Validators.maxLength(255)]],
    });
  }

  onSubmit() {
    this.isLoading = true;
    if (this.data.id) {
      this.tasksManagerService.updateDashboard(this.data.id, this.data).subscribe({
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
      this.tasksManagerService.addDashboard(this.data).subscribe({
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
