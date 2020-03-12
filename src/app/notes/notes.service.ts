import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Note } from '../shared/models/note';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private api = environment.api;
  private endpoint = 'notes';
  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http
      .get(`${this.api}/${this.endpoint}`)
      .pipe(
        map((res: any) => res.data as Note[]),
      )
      .toPromise();
  }

  create(note: Note) {
    return this.http
      .post(`${this.api}/${this.endpoint}`, note)
      .pipe(
        map((res: any) => res.data as Note),
      )
      .toPromise();
  }

  update(id: string, note: Note) {
    return this.http
      .put(`${this.api}/${this.endpoint}/${id}`, note)
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
