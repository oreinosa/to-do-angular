import { List } from './../../shared/models/crud/list';
import { Component, } from '@angular/core';
import { Note } from 'src/app/shared/models/note';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends List<Note> {
  constructor(
    public notesService: NotesService
  ) {
    super(notesService);
  }

}
