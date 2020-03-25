import { Container } from './../shared/models/crud/container';
import { Component } from '@angular/core';
import { Note } from '../shared/models/note';
import { NotesService } from './notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent extends Container<Note>  {

  constructor(
    public notesService: NotesService,
  ) {
    super(notesService);
  }

}
