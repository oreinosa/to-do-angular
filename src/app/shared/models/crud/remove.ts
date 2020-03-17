import { Input } from '@angular/core';
import { DAO } from './dao';

export class Remove<T>   {
  @Input() object: T;
  errorMessage = "";
  constructor(
    private dao: DAO<T>
  ) { }

  async onDelete() {
    try {
      await this.dao.delete(this.object["_id"]);
      this.onBack();
    } catch (e) {
      console.log(e);
      this.errorMessage = e;
    }
  }

  onBack() {
    this.dao.onBack();
  }

  get docName() {
    return this.dao.docName;
  }
}
