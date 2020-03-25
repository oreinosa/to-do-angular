import { Input, OnInit } from '@angular/core';
import { DAO } from './dao';
import { Observable } from 'rxjs';
export class Update<T> implements OnInit {
  object$: Observable<T>;
  errorMessage = "";
  constructor(
    private dao: DAO<T>
  ) { }

  ngOnInit() {
    this.object$ = this.dao.getObjectObservable();
  }

  async onSubmit(object: T) {
    try {
      const updatedList = await this.dao.update(object["_id"], object);
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
