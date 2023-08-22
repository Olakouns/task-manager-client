import { Role } from './role';
import {BaseEntity} from "./base-entity";
import {StatusUser} from "./enums/status-user.enum";

export class User extends BaseEntity{
  id: string;
  name: string;
  username: string;
  email: string;
  roles: Array<Role>;
  status: StatusUser;
  role: Role;
}
