import { Component } from '@angular/core';
import { NotesService } from '../notes.service';
import { Note } from 'src/app/shared/models/note';
import { Remove } from '../../shared/models/crud/remove';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent extends Remove<Note> {

  constructor(
    public notesService: NotesService
  ) {
    super(notesService);
  }

}
