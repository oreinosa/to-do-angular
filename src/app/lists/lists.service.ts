import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { List } from '../shared/models/list';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListsService {
  private actionSubject = new BehaviorSubject("list");
  private api = environment.api;
  private endpoint = 'lists';

  private listsSubject = new BehaviorSubject<List[]>([]);

  constructor(
    private http: HttpClient
  ) { }

  getLists(){
    return this.listsSubject.asObservable();
  }

  getAction() {
    return this.actionSubject.asObservable();
  }

  setAction(action: string) {
    this.actionSubject.next(action);
  }

  getAll() {
    return this.http
      .get(`${this.api}/${this.endpoint}`)
      .pipe(
        map((res: any) => res.data as List[]),
        tap(lists => this.listsSubject.next(lists))
      )
      .toPromise();
  }

  create(list: List) {
    return this.http
      .post(`${this.api}/${this.endpoint}`, list)
      .pipe(
        map((res: any) => res.data as List),
      )
      .toPromise();
  }

  update(id: string, list: List) {
    return this.http
      .put(`${this.api}/${this.endpoint}/${id}`, list)
      .pipe(
        map((res: any) => res.data as List),
      )
      .toPromise();;
  }
  delete(id: string) {
    return this.http
      .delete(`${this.api}/${this.endpoint}/${id}`)
      .toPromise();
  }
}
