import {  Input } from '@angular/core';
import { DAO } from './dao';

export class List<T>  {
  @Input() all: T[];
  constructor(
    private dao: DAO<T>
  ) { }

  onAdd() {
    this.dao.setAction('add');
  }


}
