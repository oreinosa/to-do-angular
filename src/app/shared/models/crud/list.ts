import { Input } from '@angular/core';
import { DAO } from './dao';
import { Observable } from 'rxjs';

export class List<T>  {
  all$: Observable<T[]>;
  loading = false;
  constructor(
    private dao: DAO<T>
  ) { }

  ngOnInit() {
    this.all$ = this.dao.getAllObservable();
    this.getAll();
  }

  async getAll() {
    this.loading = true;
    await this.dao.getAll();
    this.loading = false;
  }

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
