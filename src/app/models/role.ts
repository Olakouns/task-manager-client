import {TypeRole} from "./enums/type-role";
import {Privilege} from "./privilege";
import {BaseEntity} from "./base-entity";


export class Role extends BaseEntity {
  id: number;
  name: String;
  description: String;
  privileges: Array<Privilege>;
  type: TypeRole;
}
