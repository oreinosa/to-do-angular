import { Component } from '@angular/core';
import { ListsService } from '../lists.service';
import { List } from 'src/app/shared/models/list';
import { Remove } from '../../shared/models/crud/remove';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent extends Remove<List> {

  constructor(
    public listsService: ListsService
  ) {
    super(listsService);
  }

}
