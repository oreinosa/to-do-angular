import { List } from './list';

export interface Note {
  title?: string;
  body?: string;
  list?: List;
  createdAt?: any;
}
