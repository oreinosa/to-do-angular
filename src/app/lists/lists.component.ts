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
  lists: List[];
  constructor(
    private listsService: ListsService
  ) { }

  ngOnInit(): void {
    this.action$ = this.listsService.getAction().pipe(
      tap(action => {
        if (action === "list") {
          this.getLists();
        }
      })
    );
  }

  async getLists() {
    try {
      this.lists = await this.listsService.getAll();
      console.log(this.lists);
    } catch (e) {
      console.log(e);
    }
  }

}
