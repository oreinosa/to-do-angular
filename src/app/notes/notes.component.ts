import { Component, OnInit, Input } from '@angular/core';
import { Note } from '../shared/models/note';
import { NotesService } from './notes.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { List } from '../shared/models/list';
import { ListsService } from '../lists/lists.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  lists$: Observable<List[]>;
  action$: Observable<string>;
  notes$: Observable<Note[]>;
  constructor(
    private notesService: NotesService,
    private listsService: ListsService
  ) { }

  ngOnInit(): void {
    this.action$ = this.notesService.getAction().pipe(
      tap(action => {
        if (action === "list") {
          // this.getNotes();
        }
      })
    );
    this.notes$ = this.notesService.getNotesObservable();
    this.lists$ = this.listsService.getListsObservable();
    this.getNotes();
  }

  getNotes() {
    this.notesService.getAll();
  }


}
