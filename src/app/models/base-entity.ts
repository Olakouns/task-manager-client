import {User} from "./user";

export class BaseEntity {
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: User;
  modifiedBy: User;
}
