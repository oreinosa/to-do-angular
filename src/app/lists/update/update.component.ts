import { Component } from '@angular/core';
import { List } from 'src/app/shared/models/list';
import { ListsService } from '../lists.service';
import { Update } from '../../shared/models/crud/update';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent extends Update<List> {
  constructor(
    public listsService: ListsService
  ) {
    super(listsService);
  }

}
