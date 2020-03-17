import { Input } from '@angular/core';
import { DAO } from './dao';
export class Update<T> {
  @Input() object: T;
  errorMessage = "";
  constructor(
    private dao: DAO<T>
  ) { }

  async onSubmit(object: T) {
    try {
      const updatedList = await this.dao.update(this.object["_id"], object);
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
