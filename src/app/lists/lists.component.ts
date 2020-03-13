import { Component, OnInit } from '@angular/core';
import { List } from '../shared/models/list';
import { ListsService } from './lists.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {
  action$: Observable<string>;
  lists$: Observable<List[]>;
  list$:Observable<List>;
  constructor(
    private listsService: ListsService
  ) { }

  ngOnInit(): void {
    this.action$ = this.listsService.getAction().pipe(
      tap(action => {
        if (action === "list") {
          // this.getLists();
        }
      })
    );
    this.lists$ = this.listsService.getListsObservable();
    this.list$ = this.listsService.getListObservable();
    this.getLists();
  }

  getLists() {
    this.listsService.getAll();
  }

  onAdd() {
    this.listsService.setAction("add");
  }

  onBack() {
    this.listsService.setList(null);
    this.listsService.setAction("list");
  }
}
