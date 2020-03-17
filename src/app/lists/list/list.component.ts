import { Component, OnInit, Input } from '@angular/core';
import { List as CrudList } from 'src/app/shared/models/crud/list';
import { List } from 'src/app/shared/models/list';
import { ListsService } from '../lists.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends CrudList<List> {
  constructor(
    public listsService: ListsService
  ) {
    super(listsService);
  }

}
