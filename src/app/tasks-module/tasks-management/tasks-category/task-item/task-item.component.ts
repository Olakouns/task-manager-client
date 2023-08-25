import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Tasks} from "../../../../models/tasks";
import {TaskCategory} from "../../../../models/task-category";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {EditTasksComponent} from "../edit-tasks/edit-tasks.component";
import {TaskDetailsComponent} from "../task-details/task-details.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {

  @Input() task: Tasks;
  @Input() taskCategory: TaskCategory;

  users = ["assets/images/user-2.jpg", "assets/images/user-1.jpg"];


  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, public dialog: MatDialog,) {


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
  }

  openTaskDetails() {
    const dialogRef = this.dialog.open(TaskDetailsComponent, {
      width: "1200px",
      data: JSON.parse(JSON.stringify({
        taskCategoryId: this.taskCategory.id,
        dashboardId: this.taskCategory.dashboard.id,
        tasks:  this.task
      })),
      autoFocus: false,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((tasks: Tasks) => {
      if (tasks) {
        this.task = tasks;
      }
    })
  }

  isDatePassed(): boolean {
    let inputDate = new Date(this.task.deadline);
    const currentDate = new Date();

    const inputYear = inputDate.getFullYear();
    const inputMonth = inputDate.getMonth();
    const inputDay = inputDate.getDate();

    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();

    if (inputYear < currentYear) {
      return true;
    } else if (inputYear === currentYear && inputMonth < currentMonth) {
      return true;
    } else if (inputYear === currentYear && inputMonth === currentMonth && inputDay < currentDay) {
      return true;
    }
    return false;
  }
}
