import {BaseEntity} from "./base-entity";
import {Tasks} from "./tasks";
import {Profile} from "./profile";

export class TaskComment extends BaseEntity{
  id : number;
  text: string;
  tasks: Tasks
  profile: Profile
}
