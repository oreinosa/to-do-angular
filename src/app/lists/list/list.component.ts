import { Component } from '@angular/core';
import { List as CrudList } from 'src/app/shared/models/crud/list';
import { List } from 'src/app/shared/models/list';
import { ListsService } from '../lists.service';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends CrudList<List>   {
  constructor(
    public listsService: ListsService,
    private router: Router
  ) {
    super(listsService);
  }

  onSelectList(list: List) {
    let queryParams = {
      list: undefined
    };
    const { name } = list;
    if (name !== "all") {
      queryParams = {
        list: list.name
      };
      this.router.navigate([''], { queryParams, queryParamsHandling: 'merge' });
    }
  }

}
