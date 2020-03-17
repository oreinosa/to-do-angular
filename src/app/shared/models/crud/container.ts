import { Observable } from 'rxjs';
import { DAO } from './dao';
import { tap } from 'rxjs/operators';

export class Container<T> {
  action$: Observable<string>;
  all$: Observable<T[]>;
  object$: Observable<T>;
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
    this.all$ = this.dao.getAllObservable();
    this.object$ = this.dao.getObjectObservable();
    this.getLists();
  }

  getLists() {
    this.dao.getAll();
  }

  onAdd() {
    this.dao.setAction("add");
  }

  onBack() {
    this.dao.onBack();
  }
}