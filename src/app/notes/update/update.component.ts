import { Component } from '@angular/core';
import { Note } from 'src/app/shared/models/note';
import { NotesService } from '../notes.service';
import { Update } from '../../shared/models/crud/update';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent extends Update<Note> {
  constructor(
    public notesService: NotesService
  ) {
    super(notesService);
  }

}
