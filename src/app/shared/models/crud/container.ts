import { Observable } from 'rxjs';
import { DAO } from './dao';
import { tap } from 'rxjs/operators';

export class Container<T> {
  action$: Observable<string>;
  constructor(
    private dao: DAO<T>
  ) { }

  ngOnInit(): void {
    this.action$ = this.dao.getAction().pipe(
      tap(action => {
        if (action === "list") {
          // this.getLists();
        }
      })
    );

  }

  get collectionName(): string {
    return this.dao.collectionName;
  }

  onAdd() {
    this.dao.setAction("add");
  }

  onBack() {
    this.dao.onBack();
  }
}