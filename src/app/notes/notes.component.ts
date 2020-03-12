import { Component, OnInit } from '@angular/core';
import { Note } from '../shared/models/note';
import { NotesService } from './notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  notes: Note[];
  constructor(
    private notesService: NotesService
  ) { }

  ngOnInit(): void {
    this.getNotes();
  }

  async getNotes() {
    try {
      this.notes = await this.notesService.getAll();
    } catch (e) {
      console.log(e);
    }
  }


}
