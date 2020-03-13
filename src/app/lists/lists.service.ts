import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { List } from '../shared/models/list';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListsService {
  private actionSubject = new BehaviorSubject("list");
  private api = environment.api;
  private endpoint = 'lists';

  private listsSubject = new BehaviorSubject<List[]>([]);
  private listSubject = new BehaviorSubject<List>(null);

  constructor(
    private http: HttpClient
  ) { }

  getListsObservable(): Observable<List[]> {
    return this.listsSubject.asObservable();
  }
  getListObservable(): Observable<List> {
    return this.listSubject.asObservable();
  }

  getAction(): Observable<string> {
    return this.actionSubject.asObservable();
  }

  setList(list: List) {
    this.listSubject.next(list);
  }

  setAction(action: string): void {
    this.actionSubject.next(action);
  }

  async getAll() {
    try {
      const lists = await this.http
        .get(`${this.api}/${this.endpoint}`)
        .pipe(
          map((res: any) => res.data as List[]),
        )
        .toPromise();
      console.log(lists);
      this.listsSubject.next(lists);
    } catch (e) {
      console.log(e);
      this.listsSubject.next([]);
    }
  }

  create(list: List) {
    return this.http
      .post(`${this.api}/${this.endpoint}`, list)
      .pipe(
        map((res: any) => res.data as List),
        tap(list => this.listsSubject.next([...this.listsSubject.value, list]))
      )
      .toPromise();
  }

  update(id: string, list: List) {
    return this.http
      .put(`${this.api}/${this.endpoint}/${id}`, list)
      .pipe(
        map((res: any) => res.data as List),
        tap(list => this.listsSubject.next([...this.listsSubject.value.map(_list => _list._id === id ? list : _list)]))
      )
      .toPromise();;
  }
  delete(id: string) {
    return this.http
      .delete(`${this.api}/${this.endpoint}/${id}`)
      .pipe(
        tap(() => this.listsSubject.next([...this.listsSubject.value.filter(_list => _list._id !== id)]))
      )
      .toPromise();
  }
}
