import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TasksManagerService} from "../services/tasks-manager.service";
import {Dashboard} from "../../models/dashboard";
import {TaskCategory} from "../../models/task-category";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {EditDashboardComponent} from "../dashboard/edit-dashboard/edit-dashboard.component";
import {MatDialog} from "@angular/material/dialog";
import {EditTaskCategoryComponent} from "./tasks-category/edit-task-category/edit-task-category.component";

@Component({
  selector: 'app-tasks-management',
  templateUrl: './tasks-management.component.html',
  styleUrls: ['./tasks-management.component.scss']
})
export class TasksManagementComponent implements OnInit {
  linkTree: Array<any> = [
    {
      name: "Dashboard",
      link: '/home'
    }
  ];

  currentDashboard: Dashboard;
  taskCategories: Array<TaskCategory> = new Array<TaskCategory>();

  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];


  constructor(private route: ActivatedRoute, public tasksManagerService: TasksManagerService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, public dialog: MatDialog) {
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
  }

  ngOnInit(): void {
    let dasId = this.route.snapshot.paramMap.get('dashboardId');
    if (dasId) {
      this.getDashboard(dasId);
      this.getTaskCategories(dasId);
    }
  }

  getDashboard(dashboardId: string) {
    this.tasksManagerService.getDashboard(dashboardId).subscribe({
      next: response => {
        this.currentDashboard = response;
        this.linkTree.push({
          name: this.currentDashboard.bordName,
          link: `/home/${this.route.snapshot.paramMap.get('dashboardId')}`
        })

      },
      error: err => {
      }
    })
  }

  getTaskCategories(dashboardId: string) {
    this.tasksManagerService.getTaskCategoryByDashboard(dashboardId).subscribe({
      next: response => {
        this.taskCategories = response;
      },
      error: err => {
        // todo: error here
      }
    })
  }

  drop2(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.taskCategories, event.previousIndex, event.currentIndex);
  }

  onAddNewTaskCategory() {
    const dialogRef = this.dialog.open(EditTaskCategoryComponent, {
      width: "800px",
      data: JSON.parse(JSON.stringify({
        dashboardId: this.currentDashboard.id
      })),
      autoFocus: false,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((taskCategory: TaskCategory) => {
      if (taskCategory) {
        this.taskCategories.push(taskCategory);
      }
    })
  }

  onEditTaskCategory($event: TaskCategory) {
    const dialogRef = this.dialog.open(EditTaskCategoryComponent, {
      width: "800px",
      data: JSON.parse(JSON.stringify({
        dashboardId: this.currentDashboard.id,
        taskCategory: $event
      })),
      autoFocus: false,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((taskCategory: TaskCategory) => {
      if (taskCategory) {
        // this.taskCategories.push(taskCategory);
        let index = this.taskCategories.findIndex(value => value.id == $event.id);
        if (index != -1) {
          this.taskCategories[index] = taskCategory;
        }
      }
    })
  }
}
