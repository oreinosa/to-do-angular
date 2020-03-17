import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note } from '../shared/models/note';
import { DAO } from '../shared/models/crud/dao';

@Injectable({
  providedIn: 'root'
})
export class NotesService extends DAO<Note> {

  constructor(
    public http: HttpClient
  ) {
    super(http, 'notes', 'note');
  }
}
