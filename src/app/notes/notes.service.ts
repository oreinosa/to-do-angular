import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Note } from '../shared/models/note';
import { DAO } from '../shared/models/crud/dao';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotesService extends DAO<Note> {

  constructor(
    public http: HttpClient
  ) {
    super(http, 'notes', 'note');
  }

  updateStatus(note: Note, status: string) {
    const params = new HttpParams();
    params.set('onlyStatus', 'true');
    return this.update(note._id, { status }, params);
  }
}
