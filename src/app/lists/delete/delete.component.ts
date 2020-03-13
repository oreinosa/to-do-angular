import { Component, OnInit, Input } from '@angular/core';
import { ListsService } from '../lists.service';
import { map } from 'rxjs/operators';
import { List } from 'src/app/shared/models/list';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
  @Input() list: List;
  errorMessage = "";
  constructor(
    private listsService: ListsService
  ) { }

  ngOnInit(): void {
  }

  async onDelete() {
    try {
      await this.listsService.delete(this.list._id);
      this.onBack();
    } catch (e) {
      console.log(e);
      this.errorMessage = e;
    }
  }

  onBack() {
    this.listsService.setList(null);
    this.listsService.setAction("list");
  }

}
