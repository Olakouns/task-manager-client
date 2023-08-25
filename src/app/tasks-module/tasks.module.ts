import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TasksRoutingModule} from './tasks-routing.module';
import {SharedModule} from "../shared-module/shared.module";
import {TasksSketchComponent} from './tasks-sketch/tasks-sketch.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {TasksManagementComponent} from './tasks-management/tasks-management.component';
import {NotificationsComponent} from './notifications/notifications.component';
import {SettingsComponent} from './settings/settings.component';
import {EditDashboardComponent} from './dashboard/edit-dashboard/edit-dashboard.component';
import {DashboardItemComponent} from './dashboard/dashboard-item/dashboard-item.component';
import {TasksCategoryComponent} from './tasks-management/tasks-category/tasks-category.component';
import {TaskItemComponent} from './tasks-management/tasks-category/task-item/task-item.component';
import {
  EditTaskCategoryComponent
} from './tasks-management/tasks-category/edit-task-category/edit-task-category.component';
import {EditTasksComponent} from './tasks-management/tasks-category/edit-tasks/edit-tasks.component';
import { TaskDetailsComponent } from './tasks-management/tasks-category/task-details/task-details.component';


@NgModule({
  declarations: [
    TasksSketchComponent,
    DashboardComponent,
    TasksManagementComponent,
    NotificationsComponent,
    SettingsComponent,
    EditDashboardComponent,
    DashboardItemComponent,
    TasksCategoryComponent,
    TaskItemComponent,
    EditTaskCategoryComponent,
    EditTasksComponent,
    TaskDetailsComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    SharedModule,
  ]
})
export class TasksModule {
}
