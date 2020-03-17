import { Input } from '@angular/core';
import { DAO } from './dao';

export class List<T>  {
  @Input() all: T[];
  constructor(
    private dao: DAO<T>
  ) { }

  onAdd() {
    this.dao.setAction('add');
  }

  onUpdate(object: T) {
    this.dao.setObject(object);
    this.dao.setAction('update');
  }
  onDelete(object: T) {
    this.dao.setObject(object);
    this.dao.setAction('remove');
  }

}
