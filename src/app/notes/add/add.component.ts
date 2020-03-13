import { Component, OnInit, Input } from '@angular/core';
import { NotesService } from '../notes.service';
import { Note } from 'src/app/shared/models/note';
import { List } from 'src/app/shared/models/list';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  @Input() lists: List[];
  note: Note = {};
  errorMessage = "";
  constructor(
    private notesService: NotesService
  ) { }

  ngOnInit(): void {
    console.log(this.lists);
  }

  onBack() {
    this.notesService.setAction('list');
  }

  async onSubmit(note: Note) {
    try {
      const createdList = await this.notesService.create(note);
      this.notesService.setAction("list");
    } catch (e) {
      console.log(e);
    }
  }

}
