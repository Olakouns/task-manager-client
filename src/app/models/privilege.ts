import {TypePrivilege} from './enums/type-privilege.enum';
import {BaseEntity} from "./base-entity";
import {TypeRole} from "./enums/type-role";
import {Role} from "./role";

export class Privilege extends BaseEntity {
  id: number;
  name: TypePrivilege;
  description: String;
  category: String;
  typeRole: TypeRole;
  roles: Array<Role>;
}
