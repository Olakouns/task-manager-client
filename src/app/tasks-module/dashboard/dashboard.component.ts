import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {EditDashboardComponent} from "./edit-dashboard/edit-dashboard.component";
import {Dashboard} from "../../models/dashboard";
import {TasksManagerService} from "../services/tasks-manager.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  linkTree: Array<any> = [
    {
      name: "Dashboard",
      link: '/home'
    }
  ];

  dashboards: Array<Dashboard> = new Array<Dashboard>();
  isLoading = false;

  constructor(public dialog: MatDialog, public tasksManagerService: TasksManagerService) {
  }

  ngOnInit(): void {
    this.onLoadData();
  }

  onLoadData() {
    this.isLoading = true;
    this.tasksManagerService.getAllDashboards().subscribe({
      next: response => {
        this.isLoading = false;
        this.dashboards = response;
      },
      error: err => {
        this.isLoading = false;
      }
    });
  }

  onAddNewDashboard() {
    const dialogRef = this.dialog.open(EditDashboardComponent, {
      width: "800px",
      autoFocus: false,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((dashboard: Dashboard) => {
      if (dashboard) {
        this.dashboards.push(dashboard);
      }
    })
  }


  onEditDash($event: Dashboard) {
    const dialogRef = this.dialog.open(EditDashboardComponent, {
      width: "800px",
      autoFocus: false,
      data: JSON.parse(JSON.stringify($event)),
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((dashboard: Dashboard) => {
      if (dashboard) {
        let index = this.dashboards.findIndex(value => value.id == $event.id);
        if (index != -1) {
          this.dashboards[index] = dashboard;
        }
      }
    })
  }
}
