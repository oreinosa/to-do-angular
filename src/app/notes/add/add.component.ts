import { Component, OnInit } from '@angular/core';
import { NotesService } from '../notes.service';
import { Note } from 'src/app/shared/models/note';
import { Add } from '../../shared/models/crud/add';
import { List } from '../../shared/models/list';
import { Observable } from 'rxjs';
import { ListsService } from '../../lists/lists.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent extends Add<Note> implements OnInit {

  lists$: Observable<List[]>;
  constructor(
    public notesService: NotesService,
    public listsService: ListsService
  ) {
    super(notesService);
  }
  ngOnInit(): void {
    this.lists$ = this.listsService.getAllObservable();
  }
  initObject(): void {
    this.object = {

    };
  }

}
