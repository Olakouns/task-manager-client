import {BaseEntity} from "./base-entity";
import {MediaFile} from "./mediaFile";
import {TaskCategory} from "./task-category";
import {Dashboard} from "./dashboard";
import {Profile} from "./profile";
import {TaskComment} from "./task-comment";

export class Tasks extends BaseEntity{
  id: string;
  title: string;
  description: string;
  imageDescription: MediaFile;
  tags: Array<string>;
  badgeColor: Array<string>
  deadline: Date;
  taskCategory: TaskCategory;
  dashboard: Dashboard;
  profiles: Array<Profile>;
  mediaFiles: Array<MediaFile>
  taskComments: Array<TaskComment>;
}
