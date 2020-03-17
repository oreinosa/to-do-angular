import { Component } from '@angular/core';
import { ListsService } from '../lists.service';
import { List } from 'src/app/shared/models/list';
import { Add } from '../../shared/models/crud/add';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent extends Add<List> {

  constructor(
    public listsService: ListsService
  ) {
    super(listsService);
  }
  initObject(): void {
    this.object = {

    };
  }

}
