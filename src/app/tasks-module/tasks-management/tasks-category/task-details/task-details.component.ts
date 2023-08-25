import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TasksManagerService} from "../../../services/tasks-manager.service";
import {Tasks} from "../../../../models/tasks";
import {MediaService} from "../../../../services/media.service";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {HttpEvent, HttpEventType} from '@angular/common/http';
import {MediaFile} from "../../../../models/mediaFile";
import {TaskComment} from "../../../../models/task-comment";

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {
  title: String = "Task Details";
  isLoading: boolean = false;
  isSavedChange: boolean = false;

  loadFileText = "Attach file";
  acceptType = 'image/*,.pdf';

  isLoadingFile: boolean;
  file: File;

  mediaFiles: Array<MediaFile> = new Array<MediaFile>();
  taskComments: Array<TaskComment> = new Array<TaskComment>();
  isSavedComment = false;
  comment: TaskComment = new TaskComment();

  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<TaskDetailsComponent>,
              public tasksManagerService: TasksManagerService,
              iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,
              public mediaService: MediaService,
              @Inject(MAT_DIALOG_DATA) public data: {
                taskCategoryId: string,
                dashboardId: string,
                tasks: Tasks
              }) {
    iconRegistry.addSvgIcon(
      "close_circle",
      sanitizer.bypassSecurityTrustResourceUrl(
        "assets/svg-icons/close-circle.svg"
      )
    );
    iconRegistry.addSvgIcon(
      "close_circle_orange",
      sanitizer.bypassSecurityTrustResourceUrl(
        "assets/svg-icons/close-circle-orange.svg"
      )
    );
    this.mediaFiles = this.data.tasks.mediaFiles
    this.taskComments = this.data.tasks.taskComments;
  }


  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close(this.data.tasks);
  }


  loadFile(selectedFiles: any) {
    let result = this.mediaService.loadFile(selectedFiles, this.file, this.loadFileText, this.isLoadingFile);
    if (result?.file) {
      this.file = result.file
      this.loadFileText = result.loadFileText
      this.isLoadingFile = result.isLoadingFile

      const extension = this.file.name.substring(
        this.file.name.lastIndexOf('.'),
        this.file.name.length
      );


      let data = extension.toLowerCase() == ".pdf" ? "pdfs" : "images";

      this.mediaService.uploadMedia(this.file, data, '').subscribe({
        next: (event: HttpEvent<any>) => {
          if (event.type == HttpEventType.Response) {
            this.mediaFiles.push(event?.body);
            this.data.tasks.mediaFiles = this.mediaFiles;
            this.tasksManagerService.attachFileToTheTask(this.data.dashboardId, this.data.taskCategoryId, this.data.tasks.id, event?.body.id).subscribe({
              next: response => {

              },
              error: err => {
                // todo : error here
              }
            })
          }
        },
        error: err => {
          this.isLoading = false;
        }
      });
    }
  }

  updateTasks() {
    this.tasksManagerService.updateTasks(this.data.dashboardId, this.data.taskCategoryId, this.data.tasks.id, this.data.tasks).subscribe({
      next: response => {
        this.isSavedChange = false;

      },
      error: err => {
        this.isSavedChange = false;
      }
    })
  }

  onSaveChange() {
    this.isSavedChange = true;
    this.updateTasks();
  }

  onCancel() {

  }

  onRemoveFile(id: number) {
    this.tasksManagerService.removeFileFromTask(this.data.dashboardId, this.data.taskCategoryId, this.data.tasks.id, id).subscribe({
      next: response => {
        let index = this.mediaFiles.findIndex(value => value.id == id);
        if (index != -1) {
          this.mediaFiles.splice(index, 1);
        }
      },
      error: err => {
        // todo manager error here
      }
    })
  }

  onSaveComment() {
    this.isSavedComment = true;
    this.tasksManagerService.addCommentToTheTasks(this.data.dashboardId, this.data.taskCategoryId, this.data.tasks.id, this.comment).subscribe({
      next: response => {
        this.isSavedComment = false;
        this.comment.text = "";
        this.taskComments.push(response);
      },
      error: err => {
        this.isSavedComment = false;
        // todo manager error here
      }
    })
  }

  onCancelComment() {
    this.comment.text = "";
  }
}
