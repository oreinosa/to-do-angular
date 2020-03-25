import { Input, OnInit } from '@angular/core';
import { DAO } from './dao';
import { Observable } from 'rxjs';

export class Remove<T> implements OnInit {
  object$: Observable<T>
  errorMessage = "";
  constructor(
    private dao: DAO<T>
  ) { }

  ngOnInit() {
    this.object$ = this.dao.getObjectObservable();
  }

  get collectionName(): string {
    return this.dao.collectionName;
  }
  get documentName(): string {
    return this.dao.documentName;
  }

  async onDelete(object: T) {
    try {
      await this.dao.delete(object["_id"]);
      this.onBack();
    } catch (e) {
      console.log(e);
      this.errorMessage = e;
    }
  }

  onBack() {
    this.dao.onBack();
  }

}
