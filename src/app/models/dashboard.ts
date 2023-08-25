import {BaseEntity} from "./base-entity";
import {Profile} from "./profile";

export class Dashboard extends BaseEntity {
  id: string;
  bordName: string;
  descriptions: string;
  profile: Profile;
}
