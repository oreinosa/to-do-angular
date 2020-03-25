import { List } from './list';

export interface Note {
  _id?: string;
  title?: string;
  body?: string;
  list?: List;
  createdAt?: any;
  listId?: string;
  status?: string;
}
