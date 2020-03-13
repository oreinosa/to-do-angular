import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Note } from '../shared/models/note';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private actionSubject = new BehaviorSubject("list");
  private api = environment.api;
  private endpoint = 'notes';
  constructor(
    private http: HttpClient
  ) { }

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
        map((res: any) => res.data as Note[]),
      )
      .toPromise();
  }

  create(Note: Note) {
    return this.http
      .post(`${this.api}/${this.endpoint}`, Note)
      .pipe(
        map((res: any) => res.data as Note),
      )
      .toPromise();
  }

  update(id: string, Note: Note) {
    return this.http
      .put(`${this.api}/${this.endpoint}/${id}`, Note)
      .pipe(
        map((res: any) => res.data as Note),
      )
      .toPromise();;
  }
  
  delete(id: string) {
    return this.http
      .delete(`${this.api}/${this.endpoint}/${id}`)
      .toPromise();
  }
}
