import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Note } from '../shared/models/note';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private actionSubject = new BehaviorSubject("list");
  private api = environment.api;
  private endpoint = 'notes';
  private notesSubject = new BehaviorSubject<Note[]>([]);

  constructor(
    private http: HttpClient
  ) { }

  getNotesObservable(): Observable<Note[]> {
    return this.notesSubject.asObservable();
  }

  getAction(): Observable<string> {
    return this.actionSubject.asObservable();
  }

  setAction(action: string) {
    this.actionSubject.next(action);
  }

  async getAll() {
    try {
      const notes = await this.http
        .get(`${this.api}/${this.endpoint}`)
        .pipe(
          map((res: any) => res.data as Note[]),
        )
        .toPromise();
      this.notesSubject.next(notes);
    } catch (e) {
      console.log(e);
      this.notesSubject.next([]);
    }

  }

  create(Note: Note) {
    return this.http
      .post(`${this.api}/${this.endpoint}`, Note)
      .pipe(
        map((res: any) => res.data as Note),
        tap(note => this.notesSubject.next([...this.notesSubject.value, note]))
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
