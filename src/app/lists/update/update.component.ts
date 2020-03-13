import { Component, OnInit, Input } from '@angular/core';
import { List } from 'src/app/shared/models/list';
import { ListsService } from '../lists.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  @Input() list: List;
  errorMessage = "";
  constructor(
    private listsService: ListsService
  ) { }

  ngOnInit(): void {
  }
  async onSubmit(list: List) {
    try {
      const updatedList = await this.listsService.update(this.list._id, list);
      this.listsService.setAction("list");
    } catch (e) {
      console.log(e);
      this.errorMessage = e;
    }
  }


}
