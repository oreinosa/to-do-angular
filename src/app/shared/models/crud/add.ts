import { DAO } from './dao';

export abstract class Add<T>  {
  object: T;
  errorMessage = "";
  constructor(
    private dao: DAO<T>
  ) {
    this.initObject();
  }

  abstract initObject(): void;

  async onSubmit(object: T) {
    try {
      const createdObject = await this.dao.create(object);
      this.dao.setAction("list");
    } catch (e) {
      console.log(e);
      this.errorMessage = e;
    }
  }

  onBack(){
    this.dao.onBack();
  }

}
