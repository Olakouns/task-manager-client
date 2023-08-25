import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TaskCategory} from "../../../models/task-category";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {Tasks} from "../../../models/tasks";
import {EditTaskCategoryComponent} from "./edit-task-category/edit-task-category.component";
import {EditTasksComponent} from "./edit-tasks/edit-tasks.component";
import {MatDialog} from "@angular/material/dialog";
import {TasksManagerService} from "../../services/tasks-manager.service";
import {getXHRResponse} from "rxjs/internal/ajax/getXHRResponse";

@Component({
  selector: 'app-tasks-category',
  templateUrl: './tasks-category.component.html',
  styleUrls: ['./tasks-category.component.scss']
})
export class TasksCategoryComponent implements OnInit {
  @Input() taskCategory: TaskCategory;
  @Output() onEditEmit: EventEmitter<TaskCategory> = new EventEmitter<TaskCategory>();

  todo = ['Get to work'];

  users = ["assets/images/user-2.jpg", "assets/images/user-1.jpg"];

  tasks: Array<Tasks> = new Array<Tasks>();

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, public dialog: MatDialog, public tasksManagerService: TasksManagerService,) {
    iconRegistry.addSvgIcon(
      "addCircle",
      sanitizer.bypassSecurityTrustResourceUrl(
        "assets/svg-icons/add-circle.svg"
      )
    );

    iconRegistry.addSvgIcon(
      "moreH",
      sanitizer.bypassSecurityTrustResourceUrl(
        "assets/svg-icons/more-h.svg"
      )
    );

    iconRegistry.addSvgIcon(
      "addSimple",
      sanitizer.bypassSecurityTrustResourceUrl(
        "assets/svg-icons/add-simple.svg"
      )
    );

    iconRegistry.addSvgIcon(
      "comments",
      sanitizer.bypassSecurityTrustResourceUrl(
        "assets/svg-icons/comments.svg"
      )
    );

    iconRegistry.addSvgIcon(
      "attachFile",
      sanitizer.bypassSecurityTrustResourceUrl(
        "assets/svg-icons/attach-file.svg"
      )
    );
  }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.tasksManagerService.getTasksByCategory(this.taskCategory.dashboard.id, this.taskCategory.id).subscribe({
      next: response => {
        this.tasks = response
      },
      error: err => {
        // todo : manage error here
      }
    })
  }

  drop(event: CdkDragDrop<Tasks[]>, taskCategory: TaskCategory) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      event.container.data[event.currentIndex].taskCategory = taskCategory

      let tasks: Tasks = event.container.data[event.currentIndex]
      this.updateTaskSection(taskCategory.dashboard.id, taskCategory.id, tasks.id, tasks);
    }
  }

  updateTaskSection(dashboardId: string, taskCategoryId: string, tasksId: string, tasks: Tasks) {
    this.tasksManagerService.updateTasks(dashboardId, taskCategoryId, tasksId, tasks).subscribe({
      error: err => {
        // todo: error here
      }
    })
  }

  addTasks() {
    const dialogRef = this.dialog.open(EditTasksComponent, {
      width: "800px",
      data: JSON.parse(JSON.stringify({
        taskCategoryId: this.taskCategory.id,
        dashboardId: this.taskCategory.dashboard.id,
      })),
      autoFocus: false,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((tasks: Tasks) => {
      if (tasks) {
        this.tasks.push(tasks);
      }
    })
  }
}
