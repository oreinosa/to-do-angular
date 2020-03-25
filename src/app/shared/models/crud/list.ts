import { Input } from '@angular/core';
import { DAO } from './dao';
import { Observable } from 'rxjs';

export class List<T>  {
  all$: Observable<T[]>;
  loading$: Observable<boolean>;
  constructor(
    private dao: DAO<T>
  ) { }

  ngOnInit() {
    this.all$ = this.dao.getAllObservable();
    this.loading$ = this.dao.getLoadingObservable();
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
