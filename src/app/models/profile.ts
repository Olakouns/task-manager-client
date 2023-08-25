import {BaseEntity} from "./base-entity";
import {MediaFile} from "./mediaFile";
import {User} from "./user";

export class Profile extends BaseEntity {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  country: string;
  birthday: Date;
  photo: MediaFile;
}
