import { Input } from '@angular/core';
import { DAO } from './dao';

export class Remove<T>   {
  @Input() object: T;
  errorMessage = "";
  constructor(
    private dao: DAO<T>
  ) { }

  get collectionName(): string {
    return this.dao.collectionName;
  }
  get documentName(): string {
    return this.dao.documentName;
  }

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

}
