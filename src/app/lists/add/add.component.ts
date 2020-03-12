import { Component, OnInit } from '@angular/core';
import { ListsService } from '../lists.service';
import { List } from 'src/app/shared/models/list';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  list: List = {};
  errorMessage = "";
  constructor(
    private listsService: ListsService
  ) { }

  ngOnInit(): void {
  }

  onBack() {
    this.listsService.setAction('list');
  }

  async onSubmit(list: List) {
    try {
      const createdList = await this.listsService.create(list);
      this.listsService.setAction("list");
    } catch (e) {
      console.log(e);
    }
  }

}
