import { User } from './user';

export class MediaFile {
  id: number;
  url: string;
  thumbnailUrl: string;
  originalName: string;
  type: string;
  createdAt: string;
  postedBy: User;
  description: string;
}
