import { Component, OnInit, Input } from '@angular/core';
import { NotesService } from '../notes.service';
import { Note } from 'src/app/shared/models/note';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() notes: Note[];
  constructor(
    private notesService: NotesService
  ) { }

  ngOnInit(): void {
  }

  onAdd() {
    this.notesService.setAction('add');
  }


}
