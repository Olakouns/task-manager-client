import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Dashboard} from "../../models/dashboard";
import {Observable} from "rxjs";
import {ApiResponse} from "../../payloads/api-response";
import {TaskCategory} from "../../models/task-category";
import {Tasks} from "../../models/tasks";
import { TaskComment } from 'src/app/models/task-comment';

@Injectable({
  providedIn: 'root'
})
export class TasksManagerService {

  BASE_URL = `${environment.task_manager.API_URL}/task-manager`;

  constructor(public httpClient: HttpClient) {
  }


  getAllDashboards(): Observable<Array<Dashboard>> {
    return this.httpClient.get<Array<Dashboard>>(`${this.BASE_URL}/dashboard`)
  }

  addDashboard(dashboard: Dashboard): Observable<Dashboard> {
    return this.httpClient.post<Dashboard>(`${this.BASE_URL}/dashboard`, dashboard)
  }

  getDashboard(dashboardId: string): Observable<Dashboard> {
    return this.httpClient.get<Dashboard>(`${this.BASE_URL}/dashboard/${dashboardId}`)
  }


  updateDashboard(dashboardId: string, dashboard: Dashboard): Observable<Dashboard> {
    return this.httpClient.put<Dashboard>(`${this.BASE_URL}/dashboard/${dashboardId}`, dashboard)
  }

  deleteDashboard(dashboardId: string): Observable<ApiResponse> {
    return this.httpClient.delete<ApiResponse>(`${this.BASE_URL}/dashboard/${dashboardId}`)
  }

  getTaskCategoryByDashboard(dashboardId: string): Observable<Array<TaskCategory>> {
    return this.httpClient.get<Array<TaskCategory>>(`${this.BASE_URL}/dashboard/${dashboardId}/task-categories`)
  }

  getTasksByCategory(dashboardId: string, taskCategoryId: string): Observable<Array<Tasks>> {
    return this.httpClient.get<Array<Tasks>>(`${this.BASE_URL}/dashboard/${dashboardId}/task-categories/${taskCategoryId}/tasks`)
  }

  addTaskCategory(dashboardId: string, taskCategory: TaskCategory): Observable<TaskCategory> {
    return this.httpClient.post<TaskCategory>(`${this.BASE_URL}/dashboard/${dashboardId}/task-categories`, taskCategory)
  }

  updateTaskCategory(dashboardId: string, taskCategoryId: string, taskCategory: TaskCategory): Observable<TaskCategory> {
    return this.httpClient.put<TaskCategory>(`${this.BASE_URL}/dashboard/${dashboardId}/task-categories/${taskCategoryId}`, taskCategory)
  }

  deleteTaskCategory(dashboardId: string, taskCategoryId: string): Observable<ApiResponse> {
    return this.httpClient.delete<ApiResponse>(`${this.BASE_URL}/dashboard/${dashboardId}/task-categories/${taskCategoryId}`)
  }

  addTasks(dashboardId: string, taskCategoryId: string, tasks: Tasks): Observable<Tasks> {
    return this.httpClient.post<Tasks>(`${this.BASE_URL}/dashboard/${dashboardId}/task-categories/${taskCategoryId}/tasks`, tasks)
  }

  updateTasks(dashboardId: string, taskCategoryId: string, tasksId: string, tasks: Tasks): Observable<Tasks> {
    return this.httpClient.put<Tasks>(`${this.BASE_URL}/dashboard/${dashboardId}/task-categories/${taskCategoryId}/tasks/${tasksId}`, tasks)
  }

  deleteTasks(dashboardId: string, taskCategoryId: string, tasksId: string): Observable<ApiResponse> {
    return this.httpClient.delete<ApiResponse>(`${this.BASE_URL}/dashboard/${dashboardId}/task-categories/${taskCategoryId}/tasks/${tasksId}`)
  }

  addUserToTheTask(dashboardId: string, taskCategoryId: string, tasksId: string, profileId: string): Observable<ApiResponse> {
    return this.httpClient.put<ApiResponse>(`${this.BASE_URL}/dashboard/${dashboardId}/task-categories/${taskCategoryId}/tasks/${tasksId}/add-user?profileId=${profileId}`, {})
  }

  removeUserFromTask(dashboardId: string, taskCategoryId: string, tasksId: string, profileId: string): Observable<ApiResponse> {
    return this.httpClient.delete<ApiResponse>(`${this.BASE_URL}/dashboard/${dashboardId}/task-categories/${taskCategoryId}/tasks/${tasksId}/add-user?profileId=${profileId}`, {})
  }


  attachFileToTheTask(dashboardId: string, taskCategoryId: string, tasksId: string, mediaFileId: number): Observable<ApiResponse> {
    return this.httpClient.put<ApiResponse>(`${this.BASE_URL}/dashboard/${dashboardId}/task-categories/${taskCategoryId}/tasks/${tasksId}/attach-file?mediaFileId=${mediaFileId}`, {})
  }

  removeFileFromTask(dashboardId: string, taskCategoryId: string, tasksId: string, mediaFileId: number): Observable<ApiResponse> {
    return this.httpClient.delete<ApiResponse>(`${this.BASE_URL}/dashboard/${dashboardId}/task-categories/${taskCategoryId}/tasks/${tasksId}/attach-file?mediaFileId=${mediaFileId}`, {})
  }

  addCommentToTheTasks(dashboardId: string, taskCategoryId: string, tasksId: string, taskComment: TaskComment): Observable<TaskComment> {
    return this.httpClient.post<TaskComment>(`${this.BASE_URL}/dashboard/${dashboardId}/task-categories/${taskCategoryId}/tasks/${tasksId}/comment`, taskComment)
  }

  removeCommentFromTask(dashboardId: string, taskCategoryId: string, tasksId: string, taskCommentId: number): Observable<ApiResponse> {
    return this.httpClient.delete<ApiResponse>(`${this.BASE_URL}/dashboard/${dashboardId}/task-categories/${taskCategoryId}/tasks/${tasksId}/comment?taskCommentId=${taskCommentId}`, {})
  }





}
