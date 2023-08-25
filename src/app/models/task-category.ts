import {BaseEntity} from "./base-entity";
import {Dashboard} from "./dashboard";

export class TaskCategory extends BaseEntity {
  id: string;
  name: string;
  indexColor: string;
  dashboard: Dashboard;
}
