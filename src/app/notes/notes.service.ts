import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Note } from '../shared/models/note';
import { DAO } from '../shared/models/crud/dao';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NotesService extends DAO<Note> {

  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    super(http, 'notes', 'note', router);
  }

  updateStatus(note: Note, status: string) {
    const params = new HttpParams();
    params.set('onlyStatus', 'true');
    return this.update(note._id, { status }, params);
  }
}
