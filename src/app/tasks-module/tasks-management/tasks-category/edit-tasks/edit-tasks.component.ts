import {Component, inject, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TasksManagerService} from "../../../services/tasks-manager.service";
import {TaskCategory} from "../../../../models/task-category";
import {Tasks} from "../../../../models/tasks";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipEditedEvent, MatChipInputEvent} from "@angular/material/chips";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MediaService} from "../../../../services/media.service";


export enum ENUM_TYPE {
  TAGS = "TAGS",
  BADGE_COLOR = "BADGE_COLOR",
}

@Component({
  selector: 'app-edit-tasks',
  templateUrl: './edit-tasks.component.html',
  styleUrls: ['./edit-tasks.component.scss']
})
export class EditTasksComponent implements OnInit {

  title: String = "Add new Task";
  form: FormGroup;
  isLoading: boolean = false;
  mode: String;
  validateText: String = "Add";
  tags: Array<string> = [];
  badgeColors: Array<string> = [];

  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  announcer = inject(LiveAnnouncer);

  ENUM_TYPE = ENUM_TYPE;

  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<EditTasksComponent>,
              public tasksManagerService: TasksManagerService,
              public mediaService : MediaService,
              @Inject(MAT_DIALOG_DATA) public data: {
                taskCategoryId: string,
                dashboardId: string,
                tasks: Tasks
              }) {

    if (this.data.tasks == null) {
      this.data.tasks = new Tasks();
    } else {
      this.title = "Task Modification";
      this.validateText = "Save changes"
    }
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      tags: ['', []],
      badgeColor: ['', []],
      deadline: ['', []],
    });
  }

  onSubmit() {
    this.isLoading = true;
    this.data.tasks.badgeColor = [...this.badgeColors];
    this.data.tasks.tags = [...this.tags];
    if (this.data.tasks.id) {
      this.tasksManagerService.updateTasks(this.data.dashboardId, this.data.taskCategoryId, this.data.tasks.id, this.data.tasks).subscribe({
        next: response => {
          this.isLoading = false;
          this.dialogRef.close(response);
        },
        error: err => {
          this.isLoading = false;
        }
      })
    } else {
      this.tasksManagerService.addTasks(this.data.dashboardId, this.data.taskCategoryId, this.data.tasks).subscribe({
        next: response => {
          this.isLoading = false;
          this.dialogRef.close(response);
        },
        error: err => {
          this.isLoading = false;
        }
      })
    }
  }

  add(event: MatChipInputEvent, type: ENUM_TYPE): void {
    const value = (event.value || '').trim();
    // Add our fruit
    if (value) {
      if (type == ENUM_TYPE.TAGS) {
        this.tags.push(value);
      } else {
        this.badgeColors.push(value);
      }
    }
    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: string, type: ENUM_TYPE): void {
    if (type == ENUM_TYPE.TAGS) {
      const index = this.tags.indexOf(tag);

      if (index >= 0) {
        this.tags.splice(index, 1);

        this.announcer.announce(`Removed ${tag}`).then();
      }
    } else {
      const index = this.badgeColors.indexOf(tag);
      if (index >= 0) {
        this.badgeColors.splice(index, 1);
        this.announcer.announce(`Removed ${tag}`).then();
      }
    }

  }

  edit(tag: string, event: MatChipEditedEvent, type: ENUM_TYPE) {
    const value = event.value.trim();
    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(tag, type);
      return;
    }

    // Edit existing fruit
    if (type == ENUM_TYPE.TAGS) {
      const index = this.tags.indexOf(tag);
      if (index >= 0) {
        this.tags[index] = value;
      }
    } else {
      const index = this.badgeColors.indexOf(tag);
      if (index >= 0) {
        this.badgeColors[index] = value;
      }
    }
  }

}
